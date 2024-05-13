import { Request, Response } from 'express';
import {
  CreateTenantInput,
  GetTenantInput,
  UpdateTenantInput,
} from '../schema/tenant.schema';
import {
  createTenant,
  findAndUpdateTenant,
  findTenant,
} from '../service/tenant.service';
import { findUser } from '../service/user.service';
import { Role } from '../enum/enum.enum';
// import { findUserRoles } from '../service/user.service';

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

export async function createTenantsHandler(
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
      tenantId: tenantId,
    });
    if (!tenant) {
      return res.sendStatus(404);
    }
    return res.send(tenant);
  } catch (error: any) {
    console.error(error);
    return res.status(409).send('Tenant not found');
  }
}

export async function updateTenantHandler(
  req: Request<UpdateTenantInput['params']>,
  res: Response
) {
  try {
    const userInfo = {
      userId: res.locals.user._id,
      tenantId: req.params.tenantId,
      update: req.body,
    };
    const user = await findUser({ _id: userInfo.userId });
    const roleCompareTo = Role.Admin;
    if (!user) {
      return res.sendStatus(404);
    }

    if (user.role !== roleCompareTo) {
      console.log('User is not authorized to update tenant');
      return res.sendStatus(403);
    }

    const updateTenant = await findAndUpdateTenant(
      { tenantId: userInfo.tenantId }, userInfo.update, { new: true }
    )

    return res.send(updateTenant);

  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}
