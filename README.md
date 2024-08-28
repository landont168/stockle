# Stockle

## Description 📈

[Stockle.ca](https://www.stockle.ca/) is a stock market-themed spinoff of the classic [Wordle](https://www.nytimes.com/games/wordle/index.html) game. In Stockle, players are challenged to guess a randomly chosen stock from a curated list. You have 6 attempts to identify the correct stock based on clues provided after each incorrect guess. The feedback includes information about the stock's sector, share price, market cap, and other financial metrics. Test your market knowledge and strategic thinking—can you crack the code and guess the stock in 6 tries?

## Tech Stack 🥞

- Frontend: React, Redux, Chart.js, Material UI
- Backend/Database: Node.js, Express.js, MongoDB, Python
- Deployment: Docker, AWS ECS, Vercel

## Deployment ☁️

- Backend: A Dockerized Node.js application is pushed to AWS Elastic Container Registry (ECR) and deployed using AWS Elastic Container Service (ECS). This setup utilizes EC2 instances and a load balancer to efficiently manage and scale the backend API service.
- Frontend: The React frontend is deployed on Vercel, benefiting from its global edge network for fast and reliable content delivery. A custom domain is also configured with Porkbun.

## Development 🏗️

- Built a robust backend with Node.js, Express.js, and MongoDB, including endpoints for stock data and user management
- Wrote a Python script to process CSV files of NASDAQ and NYSE tickers, filtering out indices, ETFs, small-cap stocks, and cross-listed stocks; fetches historical data using yfinance and stores it in MongoDB with pymongo, ensuring accurate and scalable data management
- Implemented secure token-based user authentication with JWT and bcrypt, including login, signup, and guest play options
- Developed a responsive single page app with React and and MUI, featuring interative stock charts with Chart.js
- Refactored frontend code with Redux for maintainability and performance, including custom hooks for game logic and state management
- Utilized Docker and Docker Compose for streamlined development and deployment, with frontend on Vercel and backend on AWS ECS

## Installation 🖥️

Follow these steps to easily set up and run the Stockle project locally on your machine with [Docker Compose](https://docs.docker.com/compose/).

1. **Prerequisites:**
   Before you begin, ensure you have the following installed:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

2. **Clone the Repository:**
   Start by cloning the Stockle repository to your local machine:

   ```
   git clone git@github.com:landont168/stockle.git
   cd stockle
   ```

3. **Environment Variables:**
   Set up the environment variables by creating a `.env` file in the root directory of the backend directory. Add the necessary variables:

   ```
   PORT=4000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
   SECRET=<secret>
   ```

4. **Run with Docker Compose:**
   If you have Docker and Docker Compose installed, you can easily run the entire application with a single command to access the application at http://localhost:5173.

   1. Build and start the containers:

      ```
      docker-compose up --build
      ```

   2. Stop the containers:

      ```
      docker-compose down
      ```

## Acknowledgments 📚

- [Full Stack Open](https://fullstackopen.com/en/) - For Node.js and React resources.
- [Chart.js](https://www.chartjs.org/) - For the charting library.
- [Material-UI](https://mui.com/) - For the UI components.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - For hosting the database.
- [Vercel](https://vercel.com/) - For deploying the frontend.
- [AWS ECS](https://docs.aws.amazon.com/ecs/) - For the deploying the backend.
