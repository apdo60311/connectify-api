import { IPost } from "../entities/PostEntity"

interface IPostRepository {
    findAll(): Promise<IPost[]>
    findById(id: string): Promise<IPost | null>
    create(post: IPost): Promise<IPost>
    update(id: string, friend: IPost): Promise<IPost | null>
    delete(id: string): Promise<boolean>
}

export default IPostRepository
