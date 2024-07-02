import User from "../models/user.model";

/**
 * Extracts user mentions from the provided content string.
 *
 * @param content - The content string to extract mentions from.
 * @returns An array of user IDs for the mentioned users.
 */
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