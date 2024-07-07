import mongoose from "mongoose";
import { IGroupMessage, IMessage } from "./MessageEntity";

/**
 * Represents a group chat, including the chat name, members, and messages.
 * @interface IGroupChat
 * @property {string} name - The name of the group chat.
 * @property {mongoose.Schema.Types.ObjectId[]} members - The members of the group chat.
 * @property {IGroupMessage[]} messages - The messages in the group chat.
 */
export interface IGroupChat {
    name: string;
    members: mongoose.Schema.Types.ObjectId[];
    messages: IGroupMessage[];
}