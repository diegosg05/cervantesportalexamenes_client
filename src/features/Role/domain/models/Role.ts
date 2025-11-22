import type { User } from "../../../User/domain/models/User"
import type { RoleType } from "../enums/RoleType"

export type Role = {
    id?: number
    name: RoleType
    users?: User[]
}