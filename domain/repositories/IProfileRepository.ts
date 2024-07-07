import { IProfile } from "../entities/ProfileEntity"

interface IMessageRepository {
    findAll(): Promise<IProfile[]>
    findById(id: string): Promise<IProfile | null>
    create(profile: IProfile): Promise<IProfile>
    update(id: string, friend: IProfile): Promise<IProfile | null>
    delete(id: string): Promise<boolean>
}

export default IMessageRepository
