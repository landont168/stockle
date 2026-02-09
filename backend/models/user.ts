import mongoose, { Schema, Document } from 'mongoose'
import { User } from '../types'

interface UserDocument extends User, Document {
  id: string
}

const userSchema: Schema<UserDocument> = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  gamesPlayed: {
    type: Number,
    required: true,
  },
  gamesWon: {
    type: Number,
    required: true,
  },
  currentStreak: {
    type: Number,
    required: true,
  },
  maxStreak: {
    type: Number,
    required: true,
  },
  wonLastGame: {
    type: Boolean,
    required: true,
  },
  guessDistribution: {
    type: [Number],
    required: true,
  },
})

userSchema.set('toJSON', {
  transform: (_, ret) => {
    const obj = ret as unknown as Record<string, unknown>
    obj.id = String(ret._id)
    delete obj._id
    delete obj.__v
    delete obj.passwordHash
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
