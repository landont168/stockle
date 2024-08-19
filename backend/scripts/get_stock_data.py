import yfinance as yf
import requests
import pandas as pd
import pymongo
import os
from dotenv import load_dotenv

MARKET_CAP_THRESHOLD = 2000000000

# connect to database
load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI')
CLIENT = pymongo.MongoClient(MONGODB_URI)
STOCKS_DB = CLIENT['stockle']['stocks']
HISTORY_DB = CLIENT['stockle']['histories']
STOCKS_DB.drop()
HISTORY_DB.drop()

def get_tickers():
  # get tickers from nasdaq and nyse
  nasdaq_df = pd.read_csv('nasdaq-list.csv')['Symbol']
  nyse_df = pd.read_csv('nyse-list.csv')['Symbol']
  master_df = pd.concat([nasdaq_df, nyse_df])
  
  # filter tickers
  all_tickers = [str(ticker) for ticker in master_df.tolist()]
  filtered_tickers = [ticker for ticker in all_tickers if '^' not in ticker and '/' not in ticker]
  return filtered_tickers

# filter out small cap stocks
def filter_tickers(tickers):
  filtered_tickers = []
  for ticker in tickers:
    try:
      info = yf.Ticker(ticker).info
      if info['marketCap'] < MARKET_CAP_THRESHOLD:
        raise Exception('small cap stock')
      filtered_tickers.append(ticker)
    except Exception as e:
      print(f"Error: {e} ({ticker})")
  sorted_tickers = sorted(filtered_tickers)
  filtered_df = pd.DataFrame(sorted_tickers, columns=['tickers'])
  filtered_df.to_csv('tickers.csv', index=False)
  return sorted_tickers
  
# fetch stock data from yfinance
def get_stock_data(tickers):
  stock_data = []

  for ticker in tickers:
    ticker_obj = yf.Ticker(ticker)
    info = ticker_obj.info

    try:
      stock_info = {
        'name': info['longName'],
        'ticker': info['symbol'],
        'sector': info['sector'],
        'marketCap': info['marketCap'],
        'sharePrice': info['currentPrice'],
        'revenue': info['totalRevenue'],
        'volume': info['averageVolume'],
      }

      hist = ticker_obj.history(start="2024-01-01")
      stock_hist = [{'date': date.strftime('%Y-%m-%d'), 'price': round(float(data['Close']), 2)} for date, data in hist.iterrows()]
      history_id = HISTORY_DB.insert_one({'stockHistory': stock_hist}).inserted_id
      stock_info['history'] = history_id
      stock_data.append(stock_info)
    except Exception as e:
      print(f"Error: {e} {info['symbol']}")

  return stock_data


def main():
  filtered_tickers = []
  if not os.path.exists('tickers.csv'):
    tickers = get_tickers()
    filtered_tickers = filter_tickers(tickers)
  else:
    filtered_tickers = pd.read_csv('tickers.csv')['tickers'].tolist()
  stock_data = get_stock_data(filtered_tickers)
  STOCKS_DB.insert_many(stock_data)


if __name__ == "__main__":
  main()