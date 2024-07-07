import mongoose from "mongoose";

/**
 * Represents a message in the application.
 * @interface IMessage
 * @property {mongoose.Schema.Types.ObjectId} sender - The ID of the user who sent the message.
 * @property {mongoose.Schema.Types.ObjectId} receiver - The ID of the user who received the message.
 * @property {string} content - The content of the message.
 * @property {boolean} read - Indicates whether the message has been read.
 * @property {boolean} typing - Indicates whether the user is currently typing a message.
 */

export interface IMessage extends Document {
    sender: mongoose.Schema.Types.ObjectId;
    receiver: mongoose.Schema.Types.ObjectId;
    content: string;
    read: boolean;
    typing: boolean;
}

/**
 * Represents a message in a group chat.
 * @interface IGroupMessage
 * @property {mongoose.Schema.Types.ObjectId} sender - The ID of the user who sent the message.
 * @property {string} content - The content of the message.
 * @property {mongoose.Schema.Types.ObjectId[]} readBy - The IDs of the users who have read the message.
 */
export interface IGroupMessage extends Document {
    sender: mongoose.Schema.Types.ObjectId;
    content: string;
    readBy: mongoose.Schema.Types.ObjectId[];
}

