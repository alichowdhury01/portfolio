import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import EmployeeScheduleModel, { EmployeeScheduleDocument, EmployeeScheduleInput } from "../models/employeeSchedule.model";

export async function createEmployeeSchedule(input: EmployeeScheduleInput) {
    return EmployeeScheduleModel.create(input);
}

export async function findEmployeeSchedule(
  query: FilterQuery<EmployeeScheduleDocument>,
  options: QueryOptions = { lean: true }
) {
  return EmployeeScheduleModel.findOne(query, {}, options);
}

export async function getAllEmployeeSchedules() {
  return EmployeeScheduleModel.find();
}

export async function findAndUpdateEmployeeSchedule(
  query: FilterQuery<EmployeeScheduleDocument>,
  update: UpdateQuery<EmployeeScheduleDocument>,
  options: QueryOptions
) {
  return EmployeeScheduleModel.findOneAndUpdate(query, update, options);
}

export async function deleteEmployeeSchedule(query: FilterQuery<EmployeeScheduleDocument>) {
  return EmployeeScheduleModel.deleteOne(query);
}