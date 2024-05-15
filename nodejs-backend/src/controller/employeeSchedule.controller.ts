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
        user: userInfo.userId
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
    const employeeSchedule = await findEmployeeSchedule({ scheduleName: employeeScheduleName});

    if (!employeeSchedule) {
      return res.sendStatus(404);
    }

    return res.send(employeeSchedule);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}