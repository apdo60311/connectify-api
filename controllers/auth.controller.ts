import axios from "axios";
import User from "../models/user.model"
import { errorResponse, successResponse } from "../utils/response/response.util";
import generateToken from '../utils/tokenGenerator';
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
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

export default { registerUser, loginUser }