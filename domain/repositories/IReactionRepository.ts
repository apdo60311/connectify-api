import { IReaction } from "../entities/ReactionEntity"

interface IMessageRepository {
    findAll(): Promise<IReaction[]>
    findById(id: string): Promise<IReaction | null>
    create(reaction: IReaction): Promise<IReaction>
    update(id: string, friend: IReaction): Promise<IReaction | null>
    delete(id: string): Promise<boolean>
}

export default IMessageRepository
