import yfinance as yf
import pandas as pd
import pymongo
import os
from dotenv import load_dotenv

# constants
MARKET_CAP_THRESHOLD = 2000000000
START_DATE = "2024-01-01"
TICKERS_FILE = 'tickers.csv'

# connect to and clear database
load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI')
CLIENT = pymongo.MongoClient(MONGODB_URI)
STOCKS_DB = CLIENT['stockle']['stocks']
STOCKS_DB.drop()

# HISTORY_DB = CLIENT['stockle']['histories']
# HISTORY_DB.drop()

def get_tickers():
  nasdaq_df = pd.read_csv('nasdaq-list.csv')['Symbol']
  nyse_df = pd.read_csv('nyse-list.csv')['Symbol']
  master_df = pd.concat([nasdaq_df, nyse_df])
  
  # filter tickers to remove indicies/etfs
  all_tickers = [str(ticker) for ticker in master_df.tolist()]
  filtered_tickers = [ticker for ticker in all_tickers 
                      if '^' not in ticker and '/' not in ticker]
  return filtered_tickers

# filter small cap/cross listed stocks
def filter_tickers(tickers):
  filtered_stocks = []

  for ticker in tickers:
    try:
      info = yf.Ticker(ticker).info

      # filter small cap stocks
      if info['marketCap'] < MARKET_CAP_THRESHOLD:
        raise Exception('small cap stock')
      
      # ensure fields are accessible
      stock_info = {
        'name': info['longName'],
        'ticker': info['symbol'],
        'sector': info['sector'],
        'marketCap': info['marketCap'],
        'sharePrice': info['currentPrice'],
        'revenue': info['totalRevenue'],
        'volume': info['averageVolume'],
      }

      # filter cross listed stocks by name
      stock_name = stock_info['name']
      name_exists = any(stock['name'] == stock_name for stock in filtered_stocks)
      if name_exists:
        raise Exception('cross listed stock')

      # save filtered ticker
      filtered_stock = {
        'name': stock_name,
        'ticker': stock_info['ticker'],
      }
      filtered_stocks.append(filtered_stock)

    except Exception as e:
      print(f"Error: {e} ({ticker})")
  
  # sort and save tickers to csv
  sorted_stocks = sorted(filtered_stocks, key=lambda x: x['ticker'])
  stocks_df = pd.DataFrame(sorted_stocks)
  stocks_df.to_csv(TICKERS_FILE, index=False)
  ticker_list = [stock['ticker'] for stock in sorted_stocks]
  return ticker_list
  

# fetch stock data from yfinance
def get_stock_data(tickers):
  stock_data = []

  for ticker in tickers:
    try:
      ticker_obj = yf.Ticker(ticker)
      info = ticker_obj.info
      stock_info = {
        'name': info['longName'],
        'ticker': info['symbol'],
        'sector': info['sector'],
        'marketCap': info['marketCap'],
        'sharePrice': info['currentPrice'],
        'revenue': info['totalRevenue'],
        'volume': info['averageVolume'],
      }
      
      hist = ticker_obj.history(start=START_DATE)
      stock_hist = [{'date': date.strftime('%Y-%m-%d'), 
                     'price': round(float(data['Close']), 2)} 
                    for date, data in hist.iterrows()]
      stock_info['history'] = stock_hist
      stock_data.append(stock_info)
      # history_id = HISTORY_DB.insert_one({'stockHistory': stock_hist}).inserted_id
      # stock_info['history'] = history_id
    except Exception as e:
      print(f"Error: {e} {info['symbol']}")

  return stock_data


def main():
  filtered_tickers = []

  # refetch tickers if csv does not exist
  if not os.path.exists(TICKERS_FILE):
    tickers = get_tickers()
    filtered_tickers = filter_tickers(tickers)
  else:
    filtered_tickers = pd.read_csv(TICKERS_FILE)['ticker'].tolist()
  
  # refetch stock data history
  stock_data = get_stock_data(filtered_tickers)
  STOCKS_DB.insert_many(stock_data)

if __name__ == "__main__":
  main()