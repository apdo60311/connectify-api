import mongoose from "mongoose";
import { IReport } from "../entities/report.entity";


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
