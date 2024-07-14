import { Request, Response } from "express";
import { CreatePatientInput } from "../schema/patient.shema";
import { createPatient } from "../service/patient.service";

export async function createPatientHandler(
  req: Request<{}, CreatePatientInput["body"]>,
  res: Response
) {

  const body = req.body;
  try {
    const patient = await createPatient({ ...body});
    return res.send(patient);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}