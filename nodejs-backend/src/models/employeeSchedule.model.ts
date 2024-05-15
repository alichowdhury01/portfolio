import mongoose from 'mongoose';
import { customAlphabet } from "nanoid";
import { UserDocument } from './user.model';

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface EmployeeScheduleInput {
  scheduleCreatedByUser: UserDocument['_id'];
  scheduleName: string;
  startTime: string;
  endTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  breakStartTime: string;
  breakEndTime: string;
}

export interface EmployeeScheduleDocument extends EmployeeScheduleInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}


const employeeScheduleSchema = new mongoose.Schema({
    scheduleName: { 
        type: String, 
        required: true, 
        unique: true,
        default: () => `schedule_${nanoid()}`
    },
    scheduleCreatedByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    lunchStartTime: { type: String, required: true },
    lunchEndTime: { type: String, required: true },
    breakStartTime: { type: String, required: true },
    breakEndTime: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);



const EmployeeScheduleModel = mongoose.model<EmployeeScheduleDocument>('EmployeeSchedule', employeeScheduleSchema);

export default EmployeeScheduleModel;