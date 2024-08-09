# stockle

aug 6, 2024 (9 hours)

- after grinding the full stack open course offered by the university of helsinki, i want to test my skills by building some full stack side project
- for the past few days, i've been working on building "spotfile" (a wordle-parody game based on guessing the artsits). however, i've realized that there's no free api that allows you to fetch artist profiles. there's the spotify web api, but it doesn't provide any interesting info about artists
- so intead, im gonna pivot to "stockle", where users guess the stock based on its chracteristics (ex. sector, market cap, etc)
- the plan is to use react for the ui + redux for state management. ill serve a backend api to serve stock data and handle user admin with node/express. mongodb will be act as the db, and ill use pymongo (python) and mongoose (node). user auth will be implemented later with bcrypt + jwt
- annoying part will be making the ui look decent - but ill look into ui libraries (ex. tailwind css, material ui?)
- finished the python script to scrape tickers from wikipedia, fetch data from yfinance, and store in mongodb using pymongo.
- gonna first work on the backend api to handle fetching stocks (easy) + user admin/auth
- will eventually pivot to work on react frontend!

aug 7, 2024 (5 hours)

- finished backend aspects (ex. stock, signup, login)
- db setup looks good - gonna need to eventually look into the formatting (ex. formatting big numbers on frontend side?)
- not sure if jwt tokens are needed (ex. not storing user info on a resource created) - but maybe for displaying user stats?
- gonna move onto building the frontend and connecting to backend
- update: implemented most of react ui - realized that material ui could be used for the search bar/results :0
- implemented game logic with the feedback board (formatted numbers) + modal game over ui + setup reducers for guess/history
- the actual game is pretty much done (ex. game logic functionality and displays)

aug 8, 2024 (6 hours)

- goal: implement user auth ui (login/signup) + functionality to display user info in top right navbar (eventually display stats)
- update #1: finished implementing user auth ui with the help of material ui for the login/signup forms + navbar with icons
- update #2: rewrote python script to fetch 2024 stock history (daily date/price) and implemented stock chart with chartjs
- next steps: fix history schema design (redux store for stocks stores the history of non-solution stocks - need to redesign with history route with stock id?) + need to fix design (avoid prop drilling and frontend mess)
- couldnt find free company logo api ;(
- one thing i've realized about building a full stack app is that it can get so messy - i feel like theres just so many things being passed as props (ex. to set states - and it can get crazy very quickly for a very basic ui component like toggling the display between the login/signup form)
