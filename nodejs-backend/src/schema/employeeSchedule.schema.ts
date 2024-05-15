import { object, string, TypeOf } from 'zod';


const payload = {
    body: object({
        scheduleName: string({
            required_error: 'Schedule name is required',
        }),
        startTime: string({
            required_error: 'Start time is required',
        }).time('Not a valid time, please use HH:MM:SS format'),
        endTime: string({
            required_error: 'End time is required',
        }).time('Not a valid time, please use HH:MM:SS format'),
        lunchStartTime: string({
            required_error: 'Lunch start time is required',
        }).time('Not a valid time, please use HH:MM:SS format'),
        lunchEndTime: string({
            required_error: 'Lunch end time is required',
        }).time('Not a valid time, please use HH:MM:SS format'),
        breakStartTime: string({
            required_error: 'Break start time is required',
        }).time('Not a valid time, please use HH:MM:SS format'),
        breakEndTime: string({
            required_error: 'Break end time is required',
        }).time('Not a valid time, please use HH:MM:SS format'),
    })
}

const param = {
    params: object({
        scheduleName: string({
            required_error: 'Schedule name is required'
        })
    })
};

export const createEmployeeScheduleSchema = object({
    ...payload,
});

export const updateEmployeeScheduleSchema = object({
    ...param,
    ...payload,
});

export const deleteEmployeeScheduleSchema = object({
    ...param,
});

export const getEmployeeScheduleSchema = object({
    ...param,
});

export type CreateEmployeeScheduleInput = TypeOf<typeof createEmployeeScheduleSchema>;
export type UpdateEmployeeScheduleInput = TypeOf<typeof updateEmployeeScheduleSchema>;
export type DeleteEmployeeScheduleInput = TypeOf<typeof deleteEmployeeScheduleSchema>;
export type GetEmployeeScheduleInput = TypeOf<typeof getEmployeeScheduleSchema>;