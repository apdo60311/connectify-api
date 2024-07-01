import mongoose, { Document } from "mongoose";

/**
 * Represents a report submitted by a user, which can be associated with either a post or a comment.
 * @interface IReport
 * @extends {mongoose.Document}
 * @property {mongoose.Schema.Types.ObjectId} reportedBy - The ID of the user who submitted the report.
 * @property {mongoose.Schema.Types.ObjectId} [postId] - The ID of the post that was reported, if applicable.
 * @property {mongoose.Schema.Types.ObjectId} [commentId] - The ID of the comment that was reported, if applicable.
 * @property {string} description - The description of the report provided by the user.
 */
export interface IReport extends Document {
    reportedBy: mongoose.Schema.Types.ObjectId;
    postId?: mongoose.Schema.Types.ObjectId;
    commentId?: mongoose.Schema.Types.ObjectId;
    description: string;
}
