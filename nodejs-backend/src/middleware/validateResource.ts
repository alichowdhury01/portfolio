import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

/**
 * Middleware function to validate Express request data against a Zod schema.
 * @param schema - Zod schema to validate request data against.
 * @returns Express middleware function.
 */
const validate =
  (schema: AnyZodObject) =>
  /**
   * Express middleware function to validate request data.
   * @param req - Express request object.
   * @param res - Express response object.
   * @param next - Express next function.
   */
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse request data against the provided Zod schema
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      // If validation succeeds, pass control to the next middleware
      next();
    } catch (e: any) {
      // If validation fails, send a 400 Bad Request response with validation errors
      return res.status(400).send(e.errors);
    }
  };

export default validate;
