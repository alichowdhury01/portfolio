import { Request, Response } from "express";
import { 
  CreateAssignmentInput,
  GetAssignmentInput,
  UpdateAssignmentInput,
 } from "../schema/assignment.schema";
import { 
  createAssignment,
  deleteAssignment,
  findAndUpdateAssignment,
  findAssignment,
  getAllAssignments,
 } from "../service/assignment.service";

export async function createAssignmentHandler(
  req: Request< CreateAssignmentInput["body"]>,
  res: Response
) {


  const body = req.body;
  try {
    const assignment = await createAssignment({ ...body});
    return res.send(assignment);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function getAssignmentHandler(
  req: Request<GetAssignmentInput["params"]>,
  res: Response
) {
  try {
    const assignmentId = req.params.assignmentId;
    const assignment = await findAssignment({ assignmentId: assignmentId });
    if (!assignment) {
      return res.sendStatus(404);
    }
    return res.send(assignment);
  } catch (error: any) {
    console.error(error);
    return res.status(409).send("Assignment not found");
  }
}

export async function getAllAssignmentsHandler(req: Request, res: Response) {
  try {
    const assignments = await getAllAssignments();

    return res.send(assignments);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function updateAssignmentHandler(
  req: Request<UpdateAssignmentInput["params"], UpdateAssignmentInput["body"]>,
  res: Response
) {
  const { assignmentId } = req.params;
  const input = req.body;
  try {
    const assignment = await findAssignment({ assignmentId: assignmentId });
    if (!assignment) {
      return res.sendStatus(404);
    }
    const updatedAssignment = await findAndUpdateAssignment(
      { assignmentId: assignmentId },
      input,
      { new: true }
    );
    return res.send(updatedAssignment);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function deleteAssignmentHandler(
  req: Request<GetAssignmentInput["params"]>,
  res: Response
) {
  try {
    const assignmentId = req.params.assignmentId;
    const assignment = await findAssignment({ assignmentId: assignmentId });
    if (!assignment) {
      return res.sendStatus(404);
    }
    await deleteAssignment({ assignmentId: assignmentId });
    return res.sendStatus(200);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

