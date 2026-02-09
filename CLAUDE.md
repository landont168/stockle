# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Stockle is a stock market-themed Wordle game. Players guess a stock from a curated list in 6 attempts, receiving clues about sector, share price, market cap, etc. after each guess.

## Development Commands

### Backend (Express/TypeScript)
```bash
cd backend
npm run dev          # Start dev server with nodemon (port 4000)
npm run build        # Compile TypeScript (tsc)
npm start            # Run compiled JS from dist/
```

### Frontend (React/Vite)
```bash
cd frontend
npm run dev          # Start Vite dev server (port 5173)
npm run build        # Type-check + Vite build
npm run type-check   # TypeScript check only (tsc --noEmit)
npm run lint         # ESLint
```

### Docker (full stack)
```bash
docker-compose up --build   # Run both services
docker-compose down         # Stop
```

### Data Pipeline
Stock data is populated via a Python script in `backend/scripts/`:
```bash
cd backend/scripts
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python get_stock_data.py     # Fetches from yfinance, stores in MongoDB (~10 min)
```

## Architecture

### Backend (`backend/`)
- **TypeScript Node/Express** app with MongoDB via Mongoose
- Entry: `index.ts` starts server, `app.ts` configures Express middleware and routes
- **API routes** (all under `/api`):
  - `/api/stocks` — CRUD for stock data (`controllers/stocks.ts`)
  - `/api/users` — user registration and stats updates (`controllers/users.ts`)
  - `/api/login` — JWT authentication (`controllers/login.ts`)
- **Models**: `models/stock.ts` (Stock with historical price data) and `models/user.ts` (User with game statistics)
- **Middleware** (`utils/middleware.ts`): request logging, error handling, JWT-based `userExtractor` for authenticated routes
- **Types**: all shared interfaces in `types/index.ts`
- Auth: JWT tokens (1hr expiry) with bcrypt password hashing

### Frontend (`frontend/`)
- **React 18 SPA** with Vite, MUI components, and Chart.js for visualizations
- **Redux Toolkit** state management (`store.ts`):
  - `stockReducer` — stock list from API
  - `guessReducer` — current game guesses
  - `userReducer` / `usersReducer` — authenticated user and leaderboard
  - `notificationReducer` — UI alerts
  - `guestReducer` — guest mode toggle
- **Services** (`services/`): axios-based API clients for stocks, users, login
- **Custom hooks** (`hooks/`): `useGame` (core game logic — solution selection, guess validation, win/loss tracking), `reduxHooks` (typed dispatch/selector), `useDarkMode`
- **Vite proxy**: `/api` requests proxy to `http://localhost:4000` in dev
- Path aliases via `vite-tsconfig-paths` (imports like `from 'types'`)

### Environment
Backend requires a `.env` file in `backend/`:
```
PORT=4000
MONGODB_URI=mongodb+srv://...
SECRET=<jwt-secret>
```
