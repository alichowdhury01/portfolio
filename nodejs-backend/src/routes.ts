import { Express, Request, Response } from 'express';
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from './controller/product.controller';
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import validateResource from './middleware/validateResource';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from './schema/product.schema';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';
import {
  createTenantHandler,
  getTenantHandler,
  // updateTenantHandler,
  // updateTenantHandler,
} from './controller/tenant.controller';
import { createTenantSchema, getTenantSchema, updateTenantSchema } from './schema/tenant.schema';
import { createAssignmentSchema } from './schema/assignment.schema';
import { createAssignmentHandler } from './controller/assignment.controller';

/**
 * Defines the application routes.
 * @param app The Express application instance.
 */
function routes(app: Express) {
  // Health check route
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // User creation route
  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  // User session creation route
  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  // Get user sessions route
  app.get('/api/sessions', requireUser, getUserSessionsHandler);

  // Delete user session route
  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  app.post(
    '/api/products',
    requireUser,
    validateResource(createProductSchema),
    createProductHandler
  );

  app.put(
    '/api/products/:productId',
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  app.get(
    '/api/products/:productId',
    validateResource(getProductSchema),
    getProductHandler
  );

  app.delete(
    '/api/products/:productId',
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );

  app.post(
    '/api/tenant',
    validateResource(createTenantSchema),
    createTenantHandler
  );

  app.get(
    '/api/tenants/:tenantId',
  
    getTenantHandler
  );

  // app.put(
  //   '/api/tenants/:tenantId',
  //   [requireUser, validateResource(updateTenantSchema)],
  //   updateTenantHandler
  // );

  app.post(
    '/api/assignment', 
    validateResource(createAssignmentSchema),
    createAssignmentHandler
  );
}

export default routes;
