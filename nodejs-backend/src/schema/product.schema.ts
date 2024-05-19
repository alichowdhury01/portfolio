import { object, number, string, TypeOf } from 'zod';

const payload = {
  body: object({
    productId: string({
      required_error: 'Product ID is required',
    }),
    title: string({
      required_error: 'Title is required',
    }),
    description: string({
      required_error: 'Description is required',
    }).min(120, 'Description must be at least 120 characters long'),
    price: number({
      required_error: 'Price is required',
    }),
    image: string({
      required_error: 'Image is required',
    }),
  }),
};

const param = {
  params: object({
    productId: string({
      required_error: 'Product ID is required',
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...param,
  ...payload,
});

export const deleteProductSchema = object({
  ...param,
});

export const getProductSchema = object({
  ...param,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
