export interface StockHistory {
    date: string
    price: number
}

export interface Stock {
    id: string
    name: string
    ticker: string
    sector: string
    marketCap: number
    sharePrice: number
    revenue: number
    volume: number
    history: StockHistory[]
}

export type StockGuess = Omit<Stock, 'history'> | null

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

export interface UserCredentials {
    username: string
    password: string
}

export interface UserRegister {
    name: string
    username: string
    password: string
}

export interface UserLeaderboard {
    id: number
    username: string
    score: number
    isCurrentUser: boolean
}

export interface GameResult {
    won: boolean
    attempts: number
}

export interface NotificationInfo {
    message: string
    type?: 'success' | 'error' | 'info'
}

export type Token = string | null