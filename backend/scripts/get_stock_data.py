import yfinance as yf
import pandas as pd
import pymongo
import os
from dotenv import load_dotenv

load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI')


def get_tickers():
  wiki_url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
  df = pd.read_html(wiki_url, header=0)[0][['Symbol', 'Security']]
  return df


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
      stock_data.append(stock_info)
    except:
      print(f"Error: {ticker}")

  return stock_data


def main():
  # connect to db
  client = pymongo.MongoClient(MONGODB_URI)
  db = client['stockle']['stocks']
  db.drop()

  # insert stock data into db
  tickers = get_tickers()
  stock_data = get_stock_data(tickers)
  db.insert_many(stock_data)


if __name__ == "__main__":
  main()