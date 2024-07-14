import mongoose from 'mongoose';


export interface PatientInput {
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