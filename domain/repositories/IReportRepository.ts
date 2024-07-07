import { IReport } from "../entities/ReportEntity"

interface IMessageRepository {
    findAll(): Promise<IReport[]>
    findById(id: string): Promise<IReport | null>
    create(report: IReport): Promise<IReport>
    update(id: string, friend: IReport): Promise<IReport | null>
    delete(id: string): Promise<boolean>
}

export default IMessageRepository
