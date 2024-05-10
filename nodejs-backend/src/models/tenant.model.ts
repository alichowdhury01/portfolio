import mongoose from "mongoose";
import { UserDocument } from "./user.model";

// Define the enum for apartment numbers
enum ApartmentNumber {
  number1 = '1',
  number2 = '2',
  number3 = '3',
  number4 = '4',
  number5 = '5',
  number6 = '6',
  number7 = '7',
  number8 = '8',
  number9 = '9',
}


export interface TenantInput {
  user: UserDocument["_id"];
  tenantId: number;
  firstName: string;
  lastName: string;
  email: string;
  apartmentNumber: string;
  phone: string;
  moveInDate: string;
  moveOutDate: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
  activeTenant?: boolean;
}

export interface TenantDocument extends TenantInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

// Define the Counter Schema
const tenantCounterSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 0 },
  },
  { timestamps: false }
);

const TenantCounterModel = mongoose.model("Tenant Counter", tenantCounterSchema);


const tenantSchema = new mongoose.Schema(
  {
    tenantId: {
      type: Number,
      unique: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    apartmentNumber: { type: String, required: true, enum: Object.values(ApartmentNumber) },
    phone: { type: String, required: true, unique: true },
    moveInDate: { type: String, required: true },
    moveOutDate: { type: String, required: true }, 
    emergencyContactName: { type: String, required: true },
    emergencyContactPhoneNumber: { type: String, required: true },
    activeTenant: { type: Boolean, require: true },
  },
  {
    timestamps: true,
  }
);

// Function to get the next sequence value
async function getNextSequenceValue(sequenceName: string) {
  const sequenceDocument = await TenantCounterModel.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}


tenantSchema.pre<TenantDocument>("save", async function (next) {
  if (!this.tenantId) {
    this.tenantId = await getNextSequenceValue("tenantId");
  }
  next();
});

const TenantModel = mongoose.model<TenantDocument>("Tenant", tenantSchema);

export default TenantModel;
