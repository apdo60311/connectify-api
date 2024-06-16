import mongoose, { } from "mongoose";
import { IGroupChat } from "../entities/groupchat.entity";



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
