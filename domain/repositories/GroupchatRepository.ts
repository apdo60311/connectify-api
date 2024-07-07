import { IGroupChat } from "../entities/GroupChatEntity"

interface IGroupChatRepository {
    findAll(): Promise<IGroupChat[]>
    findById(id: string): Promise<IGroupChat | null>
    create(groupchat: IGroupChat): Promise<IGroupChat>
    update(id: string, friend: IGroupChat): Promise<IGroupChat | null>
    delete(id: string): Promise<boolean>
}

export default IGroupChatRepository
