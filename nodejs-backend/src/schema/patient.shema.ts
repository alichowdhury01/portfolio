import { object, number, string, TypeOf, date, boolean, any } from 'zod';

const payload = {
  body: object({
    // tenantId: number({
    //   required_error: 'Tenant ID is required', 
    // }),

    name: string({
      required_error: 'Last name is required', 
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    phone: string({
      required_error: 'Phone is required',
    }).min(10, 'Phone number must be at least 10 characters long'),
  })
};


export const createPatientSchema = object({
  ...payload,
});

export type CreatePatientInput = TypeOf<typeof createPatientSchema>;
