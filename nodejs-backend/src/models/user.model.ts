import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import { Role } from '../enum/enum.enum';

// Input interface for creating a user
export interface UserInput {
  email: string;
  name: string;
  password: string;
  role: string;
}

// Interface for user document in MongoDB
export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

// Define user schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(Role) },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving user to the database
userSchema.pre('save', async function (next) {
  let user = this as UserDocument;

  // Check if password is modified
  if (!user.isModified('password')) {
    return next();
  }

  // Generate salt and hash password
  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;

  return next();
});

// Method to compare user password with provided password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  // Compare passwords using bcrypt
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

// Create user model
const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
