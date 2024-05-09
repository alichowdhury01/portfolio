import mongoose from 'mongoose';
import { UserDocument } from './user.model';

// Interface for Session Document
export interface SessionDocument extends mongoose.Document {
  user: UserDocument['_id']; // User reference
  valid: boolean; // Session validity
  userAgent: string; // User agent for session
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Update timestamp
}

// Session Schema
const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User reference
    valid: { type: Boolean, default: true }, // Session validity default to true
    userAgent: { type: String }, // User agent for session
  },
  {
    timestamps: true, // Automatic timestamps
  }
);

// Session Model
const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;
