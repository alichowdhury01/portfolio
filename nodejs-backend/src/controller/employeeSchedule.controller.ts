import { Request, Response } from 'express';
import {
  CreateEmployeeScheduleInput,
  GetEmployeeScheduleInput,
  UpdateEmployeeScheduleInput,
} from '../schema/employeeSchedule.schema';
import {
  createEmployeeSchedule,
  deleteEmployeeSchedule,
  findAndUpdateEmployeeSchedule,
  findEmployeeSchedule,
  getAllEmployeeSchedules,
} from '../service/employeeSchedule.service';
import { findUser } from '../service/user.service';

export async function createEmployeeScheduleHandler(
  req: Request<{}, CreateEmployeeScheduleInput['body']>,
  res: Response
) {
  try {
    const userInfo = {
      userId: res.locals.user._id,
      body: req.body,
    };
    const employeeSchedule = await createEmployeeSchedule({
      ...userInfo.body,
      user: userInfo.userId,
    });

    return res.send(employeeSchedule);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function getEmployeeScheduleHandler(
  req: Request<GetEmployeeScheduleInput['params']>,
  res: Response
) {
  try {
    const employeeScheduleName = req.params.scheduleName;
    const employeeSchedule = await findEmployeeSchedule({
      scheduleName: employeeScheduleName,
    });

    if (!employeeSchedule) {
      return res.sendStatus(404);
    }

    return res.send(employeeSchedule);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function getAllEmployeeSchedulesHandler(
  req: Request,
  res: Response
) {
  try {
    const employeeSchedules = await getAllEmployeeSchedules();
    return res.send(employeeSchedules);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function updateEmployeeScheduleHandler(
  req: Request<UpdateEmployeeScheduleInput['params'], any, UpdateEmployeeScheduleInput['body']>,
  res: Response
) {
  try {
    const employeeScheduleName = req.params.scheduleName;
    const update = req.body;
    const existingEmployeeSchedule = await findEmployeeSchedule({
      scheduleName: employeeScheduleName,
    });

    if (!existingEmployeeSchedule) {
      return res.sendStatus(404);
    }

    const updatedEmployeeSchedule = await findAndUpdateEmployeeSchedule(
      { scheduleName: employeeScheduleName },
      update,
      { new: true }
    );

    return res.send(updatedEmployeeSchedule);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function deleteEmployeeScheduleHandler(
  req: Request<GetEmployeeScheduleInput['params']>,
  res: Response
) {
  try {
    const employeeScheduleName = req.params.scheduleName;
    const existingEmployeeSchedule = await findEmployeeSchedule({
      scheduleName: employeeScheduleName,
    });

    if (!existingEmployeeSchedule) {
      return res.sendStatus(404);
    }

    await deleteEmployeeSchedule({ scheduleName: employeeScheduleName });

    return res.sendStatus(200);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}