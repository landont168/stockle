import yfinance as yf
import pandas as pd
import pymongo
import os
from dotenv import load_dotenv

# connect to databases
load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI')
client = pymongo.MongoClient(MONGODB_URI)

# clear existing collections
stocks_db = client['stockle']['stocks']
history_db = client['stockle']['histories']
stocks_db.drop()
history_db.drop()

# web scrape sp500 tickers from wikipedia
def get_tickers():
  wiki_url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
  df = pd.read_html(wiki_url, header=0)[0][['Symbol', 'Security']]
  return df

# fetch stock data from yfinance
def get_stock_data(df):
  stock_data = []

  for _, row in df.iterrows():
    ticker = row['Symbol']
    ticker_obj = yf.Ticker(ticker)
    info = ticker_obj.info

    try:
      stock_info = {
        'name': row['Security'],
        'ticker': info['symbol'],
        'sector': info['sector'],
        'marketCap': info['marketCap'],
        'sharePrice': info['currentPrice'],
        'revenue': info['totalRevenue'],
        'volume': info['averageVolume'],
      }

      hist = ticker_obj.history(start="2024-01-01")
      stock_hist = [{'date': date.strftime('%Y-%m-%d'), 'price': round(float(data['Close']), 2)} for date, data in hist.iterrows()]
      history_id = history_db.insert_one({'stockHistory': stock_hist}).inserted_id
      stock_info['history'] = history_id
      stock_data.append(stock_info)
    except Exception as e:
      print(f"Error: {e}")

  return stock_data


def main():
  tickers = get_tickers()
  stock_data = get_stock_data(tickers)
  stocks_db.insert_many(stock_data)


if __name__ == "__main__":
  main()