export interface StockHistory {
    date: string
    price: number
}

export interface Stock {
    name: string
    ticker: string
    sector: string
    marketCap: number
    sharePrice: number
    revenue: number
    volume: number
    history: StockHistory[]
}

export interface User {
    id: string
    username: string
    name: string
    passwordHash: string
    gamesPlayed: number
    gamesWon: number
    currentStreak: number
    maxStreak: number
    wonLastGame: boolean
    guessDistribution: number[]
}

export interface UserLogin extends Omit<User, 'passwordHash'> {
    token: string
}

export interface UserCredentials {
    username: string
    password: string
}

export interface UserRegister {
    name: string
    username: string
    password: string
}

export interface ErrorResponse {
    error: string
}

export interface Config {
    MONGODB_URI: string
    PORT: string
    SECRET: string
}