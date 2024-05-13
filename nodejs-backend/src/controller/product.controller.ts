import { Request, Response } from "express";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../service/product.service";

/**
 * Creates a new product.
 * @param req - Express request object containing product information in the body
 * @param res - Express response object
 * @returns Created product
 */
export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const body = req.body;
    const product = await createProduct({ ...body, user: userId });
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

/**
 * Updates an existing product.
 * @param req - Express request object containing product ID in params and update information in body
 * @param res - Express response object
 * @returns Updated product
 */
export async function updateProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;
    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
      return res.sendStatus(403);
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
      new: true,
    });

    return res.send(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

/**
 * Retrieves a product by its ID.
 * @param req - Express request object containing product ID in params
 * @param res - Express response object
 * @returns Retrieved product
 */
export async function getProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  try {
    const productId = req.params.productId;
    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404);
    }

    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

/**
 * Deletes a product by its ID.
 * @param req - Express request object containing product ID in params
 * @param res - Express response object
 */
export async function deleteProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
      return res.sendStatus(403);
    }

    await deleteProduct({ productId });

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}
