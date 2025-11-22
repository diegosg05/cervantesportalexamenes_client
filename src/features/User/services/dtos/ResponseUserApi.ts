import type { RoleApi } from "../../../Role/services/dtos/RoleApi"

export type ResponseUserApi = {
    id: number
    username: string
    email: string
    firstname: string
    lastname: string
    phone: string
    enabled: boolean
    image: string
    role: RoleApi
}