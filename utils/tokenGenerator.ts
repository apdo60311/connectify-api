
import jwt from "jsonwebtoken"

const generateToken = (id: string, name: string) => {
    return jwt.sign({ id, name }, process.env.JWT_SECRET ?? 'SECRET', {
        expiresIn: '30d',
    });
};


export default generateToken;