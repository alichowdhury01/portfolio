import { nanoid } from 'nanoid';
import { object, number, string, TypeOf, date, boolean } from 'zod';

const payload = {
  body: object({
    // tenantId: number({
    //   required_error: 'Tenant ID is required', 
    // }),
    firstName: string({
      required_error: 'First name is required',
    }),
    lastName: string({
      required_error: 'Last name is required', 
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    apartmentNumber: string({
      required_error: 'Apartment number is required',
    }),
    phone: string({
      required_error: 'Phone is required',
    }).min(10, 'Phone number must be at least 10 characters long'),
    moveInDate: string({
      required_error: 'Move in date is required',
    }).date('Not a valid date'),
    moveOutDate: string({
      required_error: 'Move out date is required',
    }).date('Not a valid date'),
    emergencyContactName: string({
      required_error: 'Emergency contact name is required',
    }),
    emergencyContactPhoneNumber: string({
      required_error: 'Emergency contact phone number is required',
    }).min(10,
      'Emergency contact phone number must be at least 10 characters long'
    ),
    activeTenant: boolean({
      required_error: 'Active is required',
    }) 
  })
};

const param = {
  params: object({
    tenantId: string({
      required_error: 'Tenant ID is required',
    }),
  }),
};


export const createTenantSchema = object({
  ...payload,
});

export const updateTenantSchema = object({
  ...param,
  ...payload,
});

export const deleteTenantSchema = object({
  ...param,
});

export const getTenantSchema = object({
  ...param,
});

export type CreateTenantInput = TypeOf<typeof createTenantSchema>;
export type UpdateTenantInput = TypeOf<typeof updateTenantSchema>;
export type DeleteTenantInput = TypeOf<typeof deleteTenantSchema>;
export type ReadTenantInput = TypeOf<typeof getTenantSchema>;