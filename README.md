# stockle

- backend: node/express (api), python (fetch data), mongodb (database)
- frontend: react (ui), mui (ui components), redux (state management), chartjs (stock chart + guess distribution)

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
- update #3: fixed stock schema to refactor the history info into its separate endpoint - fetch history data for only the solution stock instead of storing all the history in the stocks store

aug 9, 2024 (6 hours)

- plan: setup statistics modal with stats (ex. games played, win %, current streak, max streak, guess distribution) + leaderboard modal (ex. top 5 most wins)
- update #1 (3 hours): spent a bit too long on the chart animation + preventing chart annomation on app re-render (shoutout to gpt + useref tho) - the chart is looking pretty cool ngl
- ok not sure why but im getting some reduce typeerror randomly (sometimes) so gonna need to eventually look more into it (smth to do with tooltip in the stockchart component?)
- update #2 (3 hours): redesigned game board + header with cleaner mui icons + created togglable dark mode with mui. mui is acc super convenient + refactored modal + fixed modal theme color to match light/dark mode

aug 10, 2024 (4 hours)

- todo: implement stats modal (redesign user schema to include stats info + design frontend)
- update #1 (2 hours): set up stat modal - took longer than expected because i needed to redesign how i was handling game wins/losses (took out of useeffect hook into body function that handles game logic - had to also configure the backend to work properly with an update route for the user + frontend service for backend) - thinking about using jwt to identify user but ill put that on the side for now (i have token but not doing anything w it)
- update #2 (1 hour): designed stat modal - took a bit of time with css + chartjs to create the stats/guess distribution ui but it looks pretty good now + fixed theme preservation on reload
- update #3 (1 hour): cannot figure out bug that suggests a reduce issue in the underlying chartjs magic? nothing on google/gpt wont help. mannnnnnnn...

aug 11, 2024 (4 hours)

- todo: implement leaderboard modal to display top 5 players with most games won?
- update #1 (1 hour): implemented leaderboard modal with mui data grid
- update #2 (1 hour): created button to refresh game - had to change fetching solution logic by using usecallback hook. the callback hook is actually super useful becuse it creates a "singular function definition" and is only redefined when its dependencies change (stocks). this ensures that a useeffect hook can depend on the callback function as a dependecy before fetching a solution (since fetchsolution only changes when stocks is changed - and stocks is needed for fetching a solution - so the useeffect helps us fetch a solution on the initial render). it also allows us to call the callback function upon a button click for a solution refetch since it will simply call the function without triggering the useeffect hook (since the function def itself hasnt changed). the problem was that i was defining the fetch function as a normal js function - but the problem with that is that on the re-render, its function def would change - and therefore the useeffect hook would be triggered, which calls the fetch function - which triggers the effect hook - causing an infinite loop. wowzers
- update #3 (2 hours): created containers for the backend + frontend. proxied api requests to appropriate api url (conditionally goes to localhost if not using docker or docker backend service if using docker). not sure if i need to containerize the mongodb db but i think i need to run the python script to fetch data (goal is to create app on any machine) - assuming user has mongodb connection.

notes on docker:

- docker - platform for developing + running apps in containers
- container - package that includes all the goodies to run software (ex. source code, runtime, dependencies, env variables, config files)
- dockerfile - instructions for building an image (ex. installing dependencies, copying source code, etc)
- image - snapshot of software
- docker compose - tool for building and running multiple docker containers using a yaml config file (specifies services, networks, volumes)

aug 12, 2024 (4 hours)

- todo: implement account menu dropdown + run python script on initial docker startup? (do not fetch if stocks db already populated?)
- update #1 (2 hours) - implemented account menu dropdown with mui (contains stats + logout options) - maybe add settings/help? also highlighted logged in user in leaderboard for better design and disabled click highlight on non-logged in users
- update #2 (2 hour) - genuinly cant figure out why im getting a typeerror/reduce error - i think chartjs is using it but i cant figure out how to fix it. it might just be a problem on their end because i have no control over how they use their functions underneath the hood. idek

aug 13, 2024 (1 hour)

- todo: add notifications for signup/login? change game over screen to statistics modal? start refactoring/cleaning up code, run python script when building docker image, redesign game board with mui table? help/settings option in navbar? look into deploying app
- update #1 (1 hour): implemented noti for successful/failed sign up

aug 14, 2024 (4 hours):

- update #1 (1 hour) - added notifications for successful/failed signin/login/logout
- update #2 (1 hour) - displayed stat modal + soluton on game end using mui alert + handled dup guesses + fixed game logic handling bug
- update #3 (2 hours) - refactored frontend - took a while but got most of the junk cleaned up :)

aug 15, 2024 (5 hour)

- update #1: refactor react + css (2 hours)
- update #2: converted janky game board into mui table (2 hours)
- update #3: continued to refactor css as much as possible and improve responsiveness (1 hour). gonna go over frontend one more time to remove unused stuff. looked into refactoring css into tailwind css but i dont like how messy it can get and id rather keep all the styling in one spot

aug 16, 2024 (6 hours)

- todo: continue to refactor frontend as much as possible
- update #1 (2 hours): refactored frontend with custom hooks + reducers. having issue with no animation on game shuffle tho
- update #2 (3 hours): worked on more refactoring and cleaning up frontend LOL + created custom hook to abstract game logic/states. done with refactoring tho (i think).
- update #3 (1 hour): wow. to fix the stock chart animation, after creating a branch of the old working version, ive realized that before fetching a new solution, u need to set solution to null first. wow. also refactored solution + game handling logic into single custom hook. frontend honestly looking pretty clean and nicely refactored :) been refactoring all day wow
- update #4: added a cheeky progress circle thing on stock chart load as a placeholder so we avoid shifting when trying to render the stock chart. gonna start looking into how i could potentially deploy using aws services? would also need to buy domain heheh. ok wait something i could work on is allowing people to play without an account. i would need to create a "home screen" with a "login" and "play" button where login would direct user to login/signup form. and play button would direct user directly to the game. would also need to create a "how to play" modal. main "hard part" would be going over the code and handling different pieces of logic based on whether theres a user or not. for example, displaying leaderboard (would not include user), display stats (show a signup modal), do not update user stats, etc.
- update #5: sad times. had to get rid of the progressive line stock chart animation because the bug is actually unsolvable (error on chartjs side) - the animation would simply fail and throw some random error in console...

aug 17, 2024 (8 hours)

- update #1 (2 hours): refactored history route into stock route where frontend can retrieve a stock with its history directly using the populate method. the problem was that before i was storing all history in every stock which made the stock in the redux store giant. but i changed it so it only stores/fetches history for the actual solution stock (stored in react state instead). also made use of the jwt token to authenticate users when the game ends and i need to update user stats (extract user based on token).
- update #2 (2 hours): ok i think i got the non-user game to work. used a boolean to flag an undetermined/guest/user. scuffed my way through it. gonna def need to go over the parts again and fix the modal sizing.
- update #3 (2 hours): continued to clean up and adjust styling to be as responsive as possible. gotta be the most pointless thing lowk.
- update #4 (2 hours): finished frontend revamp/styling/refactoring/responsive chug. also fixed issue with backend where i was returning an incorrect user object on the stats update - which messed up the leaderboard feature that displayed (you). also redesigned leaderboard to refetch on render - was only fetching on initial render before. also fixed some guest logic stuff. wow did not expect to get the guest feature done in less than a day but here we are lol.

aug 18, 2024 (6 hours)

- todo: redesign header? rewrite python script to fetch all stocks? instructions/how to play popup? look into deploying with aws + buying domain.
- update #1 (2 hours): implemented rules modal + fixed noti timer to reset upon new noti + redesigned header/account menu. just need to implement home click on "stockle"
- update #2 (1 hour): implemented return home on stockle click + play as guest on login + added border for main login/signup, played around w some animations + getting logo ready. wow
- update #3 (3 hour): just spent like an hour trying to search up ways to fetch us stock tickers. insane how theres no easy way. im just gonna download nasdaq + nyse stock tickers csv and filter it out to take care of cross-listed tickers/dirty data stocks... ok after quite a bit (had to test and let script run), new data fetching looks good - starts with a total of 6760 tickers from the nasdaq/nyse - and filters out indicies/etfs/cross listed/small cap/uncomplete stocks to 1880 tickers - all history stored in mongodb now too

aug 19, 2024 (3 hours)

- todo: fix main login/signup page to use modal (allow returning to home on home login/signup)
- update #1 (1 hour): modified login/signup components into modal + rewrote python script + redesigned backend for stocks
- update #2 (2 hours): been looking into how to deploy for a fat minute. seems like docker compose integration with aws is retired so ggs. trying to look in ecs/ec2/ecr stuff - hard trying to find up to update resources?

aug 21, 2024

- after some help, plan is to deploy frontend with vercel and backend with aws ecs.
- update #1 (2 hours): lmao spent like 2 hours trying to deploy react app to vercel just to realize i had an issue with the local/github not syncing - had issue with SignUpForm.jsx vs.SignupForm.jsx (https://stackoverflow.com/questions/62378045/how-to-fix-next-js-vercel-deployment-module-not-found-error)
- update #2 (2 hours): read into aws ecs and set up aws account with budget cap (gotta make sure we dont go broke from this idk). but essentially how it should work is we push a docker image to ECR (image hoster) and pull that image from an ECS cluster (resources) - boom - next steps tbd
- useful resource for ecs vs ec2: https://stackoverflow.com/questions/40575584/what-is-the-difference-between-amazon-ecs-and-amazon-ec2

aug 22, 2024 (2 hours)

- after spending some time studying the infra of aws ecs/ecr/ec2. ive gotten my node image pushed to ECR. shoutout to this guy for goated tutorial: https://www.youtube.com/watch?v=8XnqgiQaIkU
- need to make sure i create ecs clusters and launch ec2 instances properly next

aug 23, 2024 (3 hours)
- update #1 (3 hours): raged for 3 hours trying to set up with aws ecs - idk whats going wrong - i created cluster + task definition. idk

aug 26, 2024 (2 hours)
- update: wowwww after a week of learning about aws and then struggling with deploying my node server with aws ecs/ec2. i finally got it work after using this random tutorial which used a load balancer/security group configs. (https://www.youtube.com/watch?v=gEo-w6Z3m0I&t=106s). lets gooo. just need to deploy it and make sure it works and register domain

aws notes
- ecr: docker container registry
- ecs: container orchestration service
- fargate: serverless engine that works with ecs - run containers without managing underlying infra


### challenges:

- trying to find free apis to use (pivoted from spotifle idea with artists to stocks since yfinance makes life easier)
- frontend design (css) - using material ui + chartjs to help make app look cooler/cleaner/easier for me to focus on actual react design (hooks, props)
- refactoring stock history into separete endpoint - use history id stored in stock resource to fetch at /api/history:id instead of storing huge amounts of data into stock redux store
- making chartjs work (hover design, render animation, disable animation upon updating state and re-rendering app)
- setting up docker compose to containerize backend + frontend - and then figuring out how to still enable local development with the api proxying
- adding small features has been really annoying bc i tend need to lift some state components up and pass a bunch of props or change the logic of how things worked (ex. account menu + notis)
- improving responsivenes with css - switching to mui table as game board and fixing small issues (ex. width/height changes on rerender, styling issues)
- refactoring frontend has taken so much time + energy - have to carefully think about app design (ex. what to abstract, props, reducers, hooks)
- improving responsiveness with css + mui
- reworking app to allow guests to play (preventing interactions with a user object like updating stats, displaying stats/leaderboard, etc)

### todo:

- deploy frontend with vercel + backend with aws
