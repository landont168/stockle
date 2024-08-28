# Stockle

## Description 📈

[Stockle.ca](https://www.stockle.ca/) is a stock market-themed spinoff of the classic [Wordle](https://www.nytimes.com/games/wordle/index.html) game. In Stockle, players are challenged to guess a randomly chosen stock from a curated list. You have 6 attempts to identify the correct stock based on clues provided after each incorrect guess. The clues include information about the stock's sector, share price, market cap, etc. Test your market knowledge and strategic thinking—can you crack the code and guess the stock in 6 tries?

## Tech Stack 🥞

- **Frontend**: React, Redux, Chart.js, Material UI
- **Backend/Database**: Node.js, Express.js, MongoDB, Python
- **Deployment**: Docker, AWS, Vercel

## Deployment ☁️

- **Backend**: A Dockerized Node.js application is pushed to AWS Elastic Container Registry (ECR) and deployed using AWS Elastic Container Service (ECS). The setup utilizes an EC2 instance and a load balancer to efficiently manage and scale the backend API service.
- **Frontend**: The React frontend is deployed on Vercel and a custom domain is configured with Porkbun.

## Development 🏗️

- Built a robust backend with Node.js, Express.js, and MongoDB, including endpoints for stock data and user administration
- Wrote a Python script to process CSV files of NASDAQ and NYSE tickers, filtering out indices, ETFs, small-cap stocks, and cross-listed stocks; fetches historical data using yfinance and stores it in MongoDB with pymongo
- Implemented a secure token-based user authentication with JWT and bcrypt, with login, signup, and guest play options
- Developed a responsive single page app with React and MUI, featuring interative stock charts and bar charts with Chart.js
- Refactored React state components to adopt a Flux architecture with Redux, including custom hooks for game logic and state management
- Utilized Docker and Docker Compose for streamlined development and deployment
- Deployed React app with Vercel and pushed Node-based Docker image to AWS ECR to deploy on AWS ECS/EC2

## Installation 🖥️

Follow these steps to easily set up and run the project locally with [Docker Compose](https://docs.docker.com/compose/).

1. **Prerequisites:**
   Before you begin, ensure you have the following installed:

   - [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/)

2. **Clone the Repository:**
   Start by cloning the repository to your local machine:

   ```
   git clone git@github.com:landont168/stockle.git
   cd stockle
   ```

3. **Environment Variables:**
   Set up the environment variables by creating a `.env` file in the root of the backend directory:

   ```
   PORT=4000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
   SECRET=<secret>
   ```

4. **Run Python script:**
   To fetch and store historical data from yfinance for the curated stocks in MongoDB, you must run a Python script within a virtual environment. Runtime: ~ 10 minutes.

   1. Create and active a virtual environment:

      ```
      python -m venv venv
      source venv/bin/activate
      ```

   2. Install the required dependencies:

      ```
      pip install -r backend/scripts/requirements.txt
      ```

   3. Run the Python script:

      ```
      python backend/scripts/get_stock_data.py
      ```

   4. Deactivate the virtual environment:

      ```
      deactivate
      ```

5. **Run with Docker Compose:**
   With Docker and Docker Compose, you can finally run the entire application with a single command to access the application at http://localhost:5173.

   1. Build and start the containers:

      ```
      docker-compose up --build
      ```

   2. Stop the containers:

      ```
      docker-compose down
      ```

## Acknowledgments 📚

- [Full Stack Open](https://fullstackopen.com/en/) - For Node.js, Express.js, React, and Redux resources.
- [Chart.js](https://www.chartjs.org/) - For the charting library.
- [Material-UI](https://mui.com/) - For the UI components.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - For hosting the database.
- [Vercel](https://vercel.com/) - For deploying the frontend.
- [AWS ECS](https://docs.aws.amazon.com/ecs/) - For the deploying the backend.
