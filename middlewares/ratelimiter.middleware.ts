import rateLimit from 'express-rate-limit';

/**
 * Middleware that applies a rate limit to incoming requests.
 * 
 * This middleware uses the `express-rate-limit` library to limit the number of requests
 * that can be made within a 15-minute window to 100. If a client exceeds this limit,
 * they will receive a 429 Too Many Requests response with the message "Too many requests, please try again later."
 */
export const rateLimiterMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Too many requests, please try again later.',
    },
});
