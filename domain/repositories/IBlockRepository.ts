import { IBlock } from "../entities/BlockEntity"


interface IBlockRepository {
    findAll(): Promise<IBlock[]>
    findById(id: string): Promise<IBlock | null>
    create(block: IBlock): Promise<IBlock>
    update(id: string, block: Partial<IBlock>): Promise<IBlock | null>
    delete(id: string): Promise<boolean>
}

export default IBlockRepository
