import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PatientModel, { PatientDocument, PatientInput } from "../models/patient.model";

export async function createPatient(input: PatientInput) {
    return PatientModel.create(input);
}