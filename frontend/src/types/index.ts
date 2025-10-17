export interface StockHistory {
    date: string,
    price: number
}

export interface Stock {
    name: string,
    ticker: string,
    sector: string,
    marketCap: number,
    sharePrice: number,
    revenue: number,
    volume: number,
    history: StockHistory[],
}

export interface User {
    username: string,
    name: string,
    passwordHash: string,
    gamesPlayed: number,
    gamesWon: number,
    currentStreak: number,
    wonLastGame: boolean,
    guessDistribution: number[]
}

export interface UserCredentials {
    username: string,
    password: string
}

export interface UserRegister {
    name: string
    username: string,
    password: string
}