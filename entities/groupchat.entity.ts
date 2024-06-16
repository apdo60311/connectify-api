import mongoose from "mongoose";
import { IGroupMessage, IMessage } from "./message.entity";

export interface IGroupChat {
    name: string;
    members: mongoose.Schema.Types.ObjectId[];
    messages: IGroupMessage[];
}