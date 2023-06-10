import jwt from "jsonwebtoken";
import { Users } from "../models/Users.js";

export const protect = async (req, res, next) => {
    try {
        let token;
        token = req.cookies.jwt;
        if (token) {
            const decoded = jwt.verify(
                token, process.env.JWT_SECRET
            );
            req.user = await Users.findById(decoded.userId)
            .select("-password");
            next();        
        }    
    } catch (error) {
        res.status(401).json(error);
        next(error);
    }
};


