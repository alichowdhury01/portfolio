import mongoose from "mongoose";
import { UserDocument } from "./user.model";



export interface AssignmentInput {
  user: UserDocument["_id"];
  assignmentId: number;
  assignmentName: string;

}

export interface AssignmentDocument extends AssignmentInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

// Define the Counter Schema
const assignmentCounterSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 0 },
  },
  { timestamps: false }
);

const AssignmentCounterModel = mongoose.model("Assignment Counter", assignmentCounterSchema);


const assignmentSchema = new mongoose.Schema(
  {
    assignmentId: { type: Number, unique: true },
    assignmentName: { type: String, required: true, unique: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

// Function to get the next sequence value
async function getNextSequenceValue(sequenceName: string) {
  const sequenceDocument = await AssignmentCounterModel.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true } 
  );
  return sequenceDocument.sequence_value;
}


assignmentSchema.pre<AssignmentDocument>("save", async function (next) {
  if (!this.assignmentId) {
    this.assignmentId = await getNextSequenceValue("assignmentId");
  }
  next();
});

const AssignmentModel = mongoose.model<AssignmentDocument>("Assignment", assignmentSchema);

export default AssignmentModel;
