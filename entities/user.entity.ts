export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isBanned: boolean;
    createdAt: Date;
    updatedAt: Date;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}
