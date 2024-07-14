import mongoose from 'mongoose';
import { UserDocument } from './user.model';


export interface PatientInput {
  user: UserDocument["_id"];
  email: string;
  phone: string;
  name: string;
}

export interface PatientDocument extends PatientInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}



const patientSchema = new mongoose.Schema(
  {

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },

  },
  {
    timestamps: true,
  }
);

const PatientModel = mongoose.model<PatientDocument>("Patient", patientSchema);

export default PatientModel;