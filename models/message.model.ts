import mongoose, { Document } from "mongoose";
import { IMessage } from "../entities/message.entity";

/**
 * Defines the schema for a message document in the MongoDB database.
 * The message schema includes the following fields:
 * - `sender`: the ID of the user who sent the message, referenced from the "User" collection
 * - `receiver`: the ID of the user who received the message, referenced from the "User" collection
 * - `content`: the text content of the message
 * - `read`: a boolean indicating whether the message has been read by the receiver
 * - `typing`: a boolean indicating whether the sender is currently typing a message
 * The schema also includes timestamps for when the message was created and updated.
 */
const messageSchema = new mongoose.Schema<IMessage>(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
        typing: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
