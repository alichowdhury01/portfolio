import { Request, Response } from "express";
import { 
  CreateTenantInput, 
  UpdateTenantInput 
} from "../schema/tenant.schema";
import { 
  createTenant
} from "../service/tenant.service";

export async function createTenantHandler(
  req: Request<{}, {}, CreateTenantInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const tenantId = 0;

  const body = req.body;
  try {
      const tenant = await createTenant({ ...body, user: userId, tenantId: tenantId});
  return res.send(tenant);

  } catch (error: any) {
    return res.status(409).send(error.message);
  }


}


