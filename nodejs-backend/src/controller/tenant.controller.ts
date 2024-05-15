import { Request, Response } from 'express';
import {
  CreateTenantInput,
  GetTenantInput,
  UpdateTenantInput,
} from '../schema/tenant.schema';
import {
  createTenant,
  deleteTenant,
  findAndUpdateTenant,
  findTenant,
  getAllTenants,
} from '../service/tenant.service';
import { findUser } from '../service/user.service';
import { Role } from '../enum/enum.enum';
// import { findUserRoles } from '../service/user.service';

export async function createTenantHandler(
  req: Request<{}, CreateTenantInput['body']>,
  res: Response
) {
  try {
    const userInfo = {
      userId: res.locals.user._id,
      body: req.body,
    };
    const tenant = await createTenant({
      ...userInfo.body,
      user: userInfo.userId,
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
    const tenant = await findTenant({ tenantId: tenantId });
    if (!tenant) {
      return res.sendStatus(404);
    }
    return res.send(tenant);
  } catch (error: any) {
    console.error(error);
    return res.status(409).send('Tenant not found');
  }
}

export async function getAllTenantsHandler(req: Request, res: Response) {
  try {
    const tenants = await getAllTenants();

    return res.send(tenants);
  } catch (error: any) {
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

    if (!user) {
      return res.sendStatus(404);
    }

    const updateTenant = await findAndUpdateTenant(
      { tenantId: userInfo.tenantId },
      userInfo.update,
      { new: true }
    );

    return res.send(updateTenant);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function deleteTenantHandler(
  req: Request<GetTenantInput['params']>,
  res: Response
) {
  try {
    const userInfo = {
      userId: res.locals.user._id,
      tenantId: req.params.tenantId,
    };

    const user = await findUser({ _id: userInfo.userId });

    if (!user) {
      return res.sendStatus(404);
    }

    const findTenantToDelete = await findTenant({
      tenantId: userInfo.tenantId,
    });

    if (!findTenantToDelete) {
      return res.sendStatus(404);
    }

    await deleteTenant(findTenantToDelete._id);

    return res.send(`Tenant Id: ${userInfo.tenantId} has been deleted`);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}
