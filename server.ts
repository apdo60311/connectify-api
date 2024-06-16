import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
import commentRoutes from "./routes/comment.routes";
import friendRequestRoutes from "./routes/friendrequest.routes";
import profileRoutes from "./routes/profile.routes";
import notificationRoutes from "./routes/notification.routes";
import userRoutes from "./routes/user.routes";
import likeRoutes from "./routes/like.routes";
import messageRoutes from "./routes/message.routes";
import feedRoutes from "./routes/feed.routes";
import { loggerMiddleware } from "./middlewares/logging.middleware";

// import errorHandler from "./middlewares/errorHandler";

dotenv.config();

connectDB().then(async (connection) => { });

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
// app.use(errorHandler);

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/friend-request', friendRequestRoutes)
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/feed', feedRoutes);

const PORT = process.env.PORT || 5000;
const url: string = `http://localhost:${PORT}`;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); console.log(`follow this url ${url}`); });