import { IUser } from "../entities/UserEntity"

interface IMessageRepository {
    findAll(): Promise<IUser[]>
    findById(id: string): Promise<IUser | null>
    create(user: IUser): Promise<IUser>
    update(id: string, friend: IUser): Promise<IUser | null>
    delete(id: string): Promise<boolean>
}

export default IMessageRepository
