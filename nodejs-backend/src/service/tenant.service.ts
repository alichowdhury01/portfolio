import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TenantModel, {
  TenantDocument,
  TenantInput,
} from "../models/tenant.model";

export async function createTenant(input: TenantInput) {
    return TenantModel.create(input);
}

export async function findTenant(
  query: FilterQuery<TenantDocument>,
  options: QueryOptions = { lean: true }
) {
  return TenantModel.findOne(query, {}, options);
}

export async function getAllTenants() {
  return TenantModel.find();
}

export async function findAndUpdateTenant(
  query: FilterQuery<TenantDocument>,
  update: UpdateQuery<TenantDocument>,
  options: QueryOptions
) {
  return TenantModel.findOneAndUpdate(query, update, options);
}

export async function deleteTenant(query: FilterQuery<TenantDocument>) {
  return TenantModel.deleteOne(query);
}