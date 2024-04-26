import { omit } from "lodash"
import UserModel, { UserDocument, UserInput } from "../models/user.model"

export async function createUser(input: UserInput) {
    try {
        return await UserModel.create(input)
    } catch (error: any) {
        throw new Error(error)
    }
}