import { number, object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    assignmentName: string({
      required_error: 'First name is required',
    })
  })
};

const param = {
  params: object({
    assignmentId: string({
      required_error: 'Assignment ID is required',
    }),
  }),
};


export const createAssignmentSchema = object({
  ...payload,
});

export const updateAssignmentSchema = object({
  ...param,
  ...payload,
});

export const deleteAssignmentSchema = object({
  ...param,
});

export const getAssignmentSchema = object({
  ...param,
});

export type CreateAssignmentInput = TypeOf<typeof createAssignmentSchema>;
export type UpdateAssignmentInput = TypeOf<typeof updateAssignmentSchema>;
export type DeleteAssignmentInput = TypeOf<typeof deleteAssignmentSchema>;
export type GetAssignmentInput = TypeOf<typeof getAssignmentSchema>;