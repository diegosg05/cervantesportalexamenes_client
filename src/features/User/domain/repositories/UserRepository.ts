import type { User } from "../models/User"

export interface UserRepository {

    register(user: User): Promise<User>

    login(username: string, password: string): Promise<User>

    logout(): Promise<void>

    update(firstname: string, lastname: string, image: string, phone: string): Promise<User>

    uploadImage(imageFile: File): Promise<string>

    resetPassword(oldPassword: string, newPassword: string): Promise<void>

}