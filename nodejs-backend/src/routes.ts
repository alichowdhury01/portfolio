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
  deleteTenantHandler,
  getAllTenantsHandler,
  getTenantHandler,
  updateTenantHandler,
} from './controller/tenant.controller';
import { createTenantSchema, updateTenantSchema } from './schema/tenant.schema';
import { createAssignmentSchema, updateAssignmentSchema } from './schema/assignment.schema';
import { createAssignmentHandler, deleteAssignmentHandler, getAllAssignmentsHandler, getAssignmentHandler, updateAssignmentHandler } from './controller/assignment.controller';
import { Role } from './enum/enum.enum';
import { checkRole } from './middleware/checkRole';
import { createEmployeeScheduleHandler, getAllEmployeeSchedulesHandler, getEmployeeScheduleHandler } from './controller/employeeSchedule.controller';
import { createEmployeeScheduleSchema } from './schema/employeeSchedule.schema';

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

  // Product creation route
  app.post(
    '/api/products',
    requireUser,
    validateResource(createProductSchema),
    createProductHandler
  );

  // Product update route
  app.put(
    '/api/products/:productId',
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  // Product retrieval route
  app.get(
    '/api/products/:productId',
    validateResource(getProductSchema),
    getProductHandler
  );

  // Product deletion route
  app.delete(
    '/api/products/:productId',
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );

  /**
   * All routes below require a user to be authenticated.
   * There are three middlewares used in these routes:
   * The requireUser middleware adds the user to the request object.
   * The checkRole middleware checks if the user has the required role.
   * The validateResource middleware validates the request body through a schema.
   */

  // Tenant creation route
  app.post(
    '/api/tenants',
    validateResource(createTenantSchema),
    [requireUser, checkRole(Role.Admin)],
    createTenantHandler
  );

  // Tenant retrieval route
  app.get(
    '/api/tenants/:tenantId',
    [requireUser, checkRole(Role.Admin)],
    getTenantHandler
  );

  // All tenants retrieval route
  app.get(
    '/api/tenants',
    [requireUser, checkRole(Role.Admin)],
    getAllTenantsHandler
  );

  // Tenant update route
  app.put(
    '/api/tenants/:tenantId',
    validateResource(updateTenantSchema),
    [requireUser, checkRole(Role.Admin)],
    updateTenantHandler
  );

  // Tenant deletion route
  app.delete(
    '/api/tenants/:tenantId',
    [requireUser, checkRole(Role.Admin)],
    deleteTenantHandler
  );

  // Assignment creation route
  app.post(
    '/api/assignment', 
    validateResource(createAssignmentSchema),
    [requireUser, checkRole(Role.Admin)],
    createAssignmentHandler
  );

  // Assignment update route
  app.put(
    '/api/assignment/:assignmentId',
    validateResource(updateAssignmentSchema),
    [requireUser, checkRole(Role.Admin)],
    updateAssignmentHandler
  );

  // Assignment retrieval route
  app.get(
    '/api/assignment/:assignmentId',
    [requireUser, checkRole(Role.Admin)],
    getAssignmentHandler
  );

  // Assignment deletion route
  app.delete(
    '/api/assignment/:assignmentId',
    [requireUser, checkRole(Role.Admin)],
    deleteAssignmentHandler
  );

  // Assignment retrieval route
  app.get(
    '/api/assignment',
    [requireUser, checkRole(Role.Admin)],
    getAllAssignmentsHandler
  );

  // Employee Schedule creation route
  app.post(
    '/api/employeeSchedule',
    validateResource(createEmployeeScheduleSchema),
    [requireUser, checkRole(Role.Admin)],
    createEmployeeScheduleHandler
  );

  // Get employee schedule route
  app.get(
    '/api/employeeSchedule/:scheduleName',
    [requireUser, checkRole(Role.Admin)],
    getEmployeeScheduleHandler
  );

  // Get all employee schedules route
  app.get(
    '/api/employeesSchedules',
    [requireUser, checkRole(Role.Admin)],
    getAllEmployeeSchedulesHandler
  );

  
}

export default routes;
