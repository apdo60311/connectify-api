import mongoose, { } from "mongoose";
import { IGroupChat } from "../entities/groupchat.entity";



/**
 * Defines the schema for a group chat in the application.
 * 
 * The schema includes the following fields:
 * - `name`: The name of the group chat, required.
 * - `members`: An array of `User` IDs representing the members of the group chat.
 * - `messages`: An array of message objects, each containing:
 *   - `sender`: The `User` ID of the message sender.
 *   - `content`: The content of the message.
 *   - `readBy`: An array of `User` IDs representing the users who have read the message.
 * 
 * The schema also includes timestamps for when the group chat was created and updated.
 */
const groupChatSchema = new mongoose.Schema<IGroupChat>(
    {
        name: {
            type: String,
            required: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        messages: [
            {
                sender: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                content: {
                    type: String,
                },
                readBy: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                    },
                ],
            },
        ],
    },
    { timestamps: true }
);

const GroupChat = mongoose.model<IGroupChat>("GroupChat", groupChatSchema);

export default GroupChat;
