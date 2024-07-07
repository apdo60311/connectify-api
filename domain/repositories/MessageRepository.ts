import { IMessage } from "../entities/MessageEntity"

interface IMessageRepository {
    findAll(): Promise<IMessage[]>
    findById(id: string): Promise<IMessage | null>
    create(message: IMessage): Promise<IMessage>
    update(id: string, friend: IMessage): Promise<IMessage | null>
    delete(id: string): Promise<boolean>
}

export default IMessageRepository
