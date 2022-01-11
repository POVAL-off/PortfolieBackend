import * as jwt from "jsonwebtoken";

export const generateToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'sercer-key', {expiresIn: '14d'});
};
