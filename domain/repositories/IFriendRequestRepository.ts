import { IFriendRequest } from "../entities/FriendRequestEntity"

interface IFriendRequestRepository {
    findAll(): Promise<IFriendRequest[]>
    findById(id: string): Promise<IFriendRequest | null>
    create(friendrequest: IFriendRequest): Promise<IFriendRequest>
    update(id: string, friend: IFriendRequest): Promise<IFriendRequest | null>
    delete(id: string): Promise<boolean>
}

export default IFriendRequestRepository
