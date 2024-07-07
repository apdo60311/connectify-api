import { INotification } from "../entities/NotificationEntity"

interface INotificationRepository {
    findAll(): Promise<INotification[]>
    findById(id: string): Promise<INotification | null>
    create(notification: INotification): Promise<INotification>
    update(id: string, friend: INotification): Promise<INotification | null>
    delete(id: string): Promise<boolean>
}

export default INotificationRepository
