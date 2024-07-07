import axios from "axios";
import User from "../../data/datasources/mongodb/models/User"
import { errorResponse, successResponse } from "../../core/utils/response/responseUtils";
import { body, validationResult } from 'express-validator';
import generateToken from '../../core/utils/tokenGenerator';
import { Request, Response } from "express";

/**
 * Registers a new user in the application
 *
 * @param req - The Express request object .
 * @param res - The Express response object.
 * @returns - A response with the registered user's details or an error response.
 */
export const registerUser = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);

    if (validationErrors) {
        return res.status(400).json(errorResponse(400, 'Validation failed', validationErrors.array().toString()));
    }

    try {
        const { name, email, password, bio, location, birthdate, interests, education, website, work, profilePicture } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json(errorResponse(400, "Registeration error", 'Invalid user data'));
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json(errorResponse(400, "Registeration error", 'User already registered'));
        }

        const user = new User({
            name,
            email,
            password,
        })

        const savedUser = await user.save();

        if (savedUser) {
            const userId: string = Object(user._id).toString();
            axios.post(`/api/profile/${req.params.userId}`, {
                bio,
                location,
                birthdate,
                interests,
                education,
                website,
                work,
                profilePicture,
            });

            res.status(201).json(successResponse(201, {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(userId, user.name),
            }, "User registered Successfully"),);
        } else {
            return res.status(400).json(errorResponse(400, "Registeration error", 'Invalid user data'));
        }

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Registeration error", `${error}`));
    }
};

/**
 * Logs exisisting user in the application.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns - A response containing the user's data and jwt token.
 * @throws - Returns a 400 error response if the user data is invalid.
 * @throws - Returns 401 error response if the user is not found.
 * @throws - Returns a 500 error response if an unexpected error occurs.
 */
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(errorResponse(400, "Login error", 'Invalid user data'));
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json(errorResponse(401, "Login error", 'Invalid user data'));
        }
        const isMatched = await user.matchPassword(password);

        if (isMatched) {
            const userId: string = Object(user._id).toString();

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(userId, user.name),
            });
        } else {
            return res.status(401).json(errorResponse(401, "Login error", 'Invalid email or password'));
        }

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Login error", `${error}`));
    }
};


export const validateRegisterUser = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Name is required')
        .trim()
        .escape(),
    body('email')
        .isEmail()
        .withMessage('Email is invalid')
        .trim()
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('bio')
        .optional()
        .isString()
        .trim()
        .escape(),
    body('location')
        .optional()
        .isString()
        .trim()
        .escape(),
    body('website')
        .optional()
        .isURL()
        .trim(),
    body("birthdate")
        .optional()
        .isDate()
        .withMessage("Birthdate must be a valid date"),
    body("interests")
        .optional()
        .isArray()
        .withMessage("Interests must be an array"),
    body("education")
        .optional()
        .isArray()
        .withMessage("Education must be an array"),
    body("work")
        .optional()
        .isArray()
        .withMessage("Work must be an array"),
    body("profilePicture")
        .optional()
        .isURL()
        .withMessage("Profile picture must be a valid URL"),

];

export default { registerUser, loginUser }