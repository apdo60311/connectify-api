import { IComment } from "../entities/CommentEntity"

interface ICommentRepository {
    findAll(): Promise<IComment[]>
    findById(id: string): Promise<IComment | null>
    create(comment: IComment): Promise<IComment>
    update(id: string, block: Partial<IComment>): Promise<IComment | null>
    delete(id: string): Promise<boolean>
}

export default ICommentRepository
