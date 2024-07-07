import mongoose from "mongoose";
import { IReport } from "../../../../domain/entities/ReportEntity";

/**
 * Defines the schema for a report document in the MongoDB database.
 * The report schema includes the following fields:
 * - `reportedBy`: the ObjectId reference to the user who reported the content
 * - `postId`: the ObjectId reference to the post that was reported
 * - `commentId`: the ObjectId reference to the comment that was reported
 * - `description`: a string field containing the description of the report
 * The schema also includes timestamps for when the report was created and last updated.
 */
const reportSchema = new mongoose.Schema<IReport>(
    {
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Report = mongoose.model<IReport>("Report", reportSchema);

export default Report;
