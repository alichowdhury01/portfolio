import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import AssignmentModel, { AssignmentDocument, AssignmentInput } from "../models/assignment.model";

export async function createAssignment(input: AssignmentInput) {
    return AssignmentModel.create(input);
}

export async function findAssignment(
  query: FilterQuery<AssignmentDocument>,
  options: QueryOptions = { lean: true }
) {
  return AssignmentModel.findOne(query, {}, options);
}

export async function getAllAssignments() {
  return AssignmentModel.find();
}

export async function findAndUpdateAssignment(
  query: FilterQuery<AssignmentDocument>,
  update: UpdateQuery<AssignmentDocument>,
  options: QueryOptions
) {
  return AssignmentModel.findOneAndUpdate(query, update, options);
}

export async function deleteAssignment(query: FilterQuery<AssignmentDocument>) {
  return AssignmentModel.deleteOne(query);
}