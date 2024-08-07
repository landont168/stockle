# stockle

aug 6, 2024

- after grinding the full stack open course offered by the university of helsinki, i want to test my skills by building some full stack side project
- for the past few days, i've been working on building "spotfile" (a wordle-parody game based on guessing the artsits). however, i've realized that there's no free api that allows you to fetch artist profiles. there's the spotify web api, but it doesn't provide any interesting info about artists
- so intead, im gonna pivot to "stockle", where users guess the stock based on its chracteristics (ex. sector, market cap, etc)
- the plan is to use react for the ui + redux for state management. ill serve a backend api to serve stock data and handle user admin with node/express. mongodb will be act as the db, and ill use pymongo (python) and mongoose (node). user auth will be implemented later with bcrypt + jwt
- annoying part will be making the ui look decent - but ill look into ui libraries (ex. tailwind css, material ui?)
- finished the python script to scrape tickers from wikipedia, fetch data from yfinance, and store in mongodb using pymongo.
- gonna first work on the backend api to handle fetching stocks (easy) + user admin/auth
- will eventually pivot to work on react frontend!
