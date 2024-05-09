import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TenantModel, {
  TenantDocument,
  TenantInput,
} from "../models/tenant.model";

export async function createTenant(input: TenantInput) {
    return TenantModel.create(input);
}