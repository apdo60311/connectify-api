import express from "express";
import dotenv from "dotenv";
import connectDB from "./core/config/db";
import authRoutes from "./presentation/routes/authRoutes";
import postRoutes from "./presentation/routes/postRoutes";
import commentRoutes from "./presentation/routes/commentRoutes";
import friendRequestRoutes from "./presentation/routes/friendrequestRoutes";
import profileRoutes from "./presentation/routes/profileRoutes";
import notificationRoutes from "./presentation/routes/notificationRoutes";
import userRoutes from "./presentation/routes/userRoutes";
import reactionsRoutes from "./presentation/routes/reactionRoutes";
import messageRoutes from "./presentation/routes/messageRoutes";
import feedRoutes from "./presentation/routes/feedRoutes";
import reportRoutes from "./presentation/routes/reportRoutes";
import privacyRoutes from "./presentation/routes/privacyRoutes";
import { loggerMiddleware } from "./middlewares/loggingMiddleware";
import { rateLimiterMiddleware } from "./middlewares/ratelimiterMiddleware";
import errorHandler from "./middlewares/errorMiddleware";

dotenv.config();

connectDB().then(async (connection) => { });

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(errorHandler);

app.use('/api/', rateLimiterMiddleware);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/friend-request', friendRequestRoutes)
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reactions', reactionsRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/privacy', privacyRoutes);

const PORT = process.env.PORT || 5000;
const url: string = `http://localhost:${PORT}`;

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); console.log(`follow this url ${url}`); });