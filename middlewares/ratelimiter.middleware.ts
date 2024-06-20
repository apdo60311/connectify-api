import rateLimit from 'express-rate-limit';

export const rateLimiterMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Too many requests, please try again later.',
    },
});
