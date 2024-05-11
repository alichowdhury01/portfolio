import { Request, Response } from 'express';
import {
  CreateTenantInput,
  GetTenantInput,
  UpdateTenantInput,
} from '../schema/tenant.schema';
import { createTenant, findTenant } from '../service/tenant.service';

export async function createTenantHandler(
  req: Request<{}, {}, CreateTenantInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const tenantId = 0;

  const body = req.body;
  try {
    const tenant = await createTenant({
      ...body,
      user: userId,
      tenantId: tenantId,
    });
    return res.send(tenant);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function getTenantHandler(
  req: Request<GetTenantInput['params']>,
  res: Response
) {
  try {
    const tenantId = req.params.tenantId;

    const tenant = await findTenant({       
      tenantId: tenantId});
    if (!tenant) {
      return res.sendStatus(404);
    }
    return res.send(tenant);
  } catch (error: any) {
    console.error(error);
    return res.status(409).send('Tenant not found');
  }
}
