import { IFriend } from "../entities/FriendEntity"

interface IFriendRepository {
    findAll(): Promise<IFriend[]>
    findById(id: string): Promise<IFriend | null>
    create(friend: IFriend): Promise<IFriend>
    update(id: string, friend: IFriend): Promise<IFriend | null>
    delete(id: string): Promise<boolean>
}

export default IFriendRepository
