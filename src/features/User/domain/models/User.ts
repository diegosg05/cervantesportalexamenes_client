import type { Role } from "../../../Role/domain/models/Role"

export type User = {
    id: number
    username: string
    password?: string
    email: string
    firstname: string
    lastname: string
    phone: string
    enabled: boolean
    image?: string
    role: Role
}