
import jwt from "jsonwebtoken"

/**
 * Generates a JSON Web Token (JWT) with the provided user ID and name.
 *
 * @param id - The unique identifier for the user.
 * @param name - The name of the user.
 * @returns A signed JWT token that expires in 30 days.
 */
const generateToken = (id: string, name: string) => {
    return jwt.sign({ id, name }, process.env.JWT_SECRET ?? 'SECRET', {
        expiresIn: '30d',
    });
};


export default generateToken;