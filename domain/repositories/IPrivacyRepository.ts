import { IPrivacySetting } from "../entities/PrivacyEntity"

interface IMessageRepository {
    findAll(): Promise<IPrivacySetting[]>
    findById(id: string): Promise<IPrivacySetting | null>
    create(settings: IPrivacySetting): Promise<IPrivacySetting>
    update(id: string, friend: IPrivacySetting): Promise<IPrivacySetting | null>
    delete(id: string): Promise<boolean>
}

export default IMessageRepository
