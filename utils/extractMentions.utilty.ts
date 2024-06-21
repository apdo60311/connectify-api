import User from "../models/user.model";

export const extractMentions = async (content: string) => {
    const mentionRegex = /@(\w+)/g;
    const mentions: string[] = [];
    let match;

    while ((match = mentionRegex.exec(content)) !== null) {
        mentions.push(match[1]);
    }

    const mentionedUsers = await User.find({ name: { $in: mentions } });
    return mentionedUsers.map(user => user._id);
};