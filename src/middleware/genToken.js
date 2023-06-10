import jwt from "jsonwebtoken";

export const genToken = (res, userId) => {
    const token = jwt.sign(
        { userId }, 
        process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        // Prevent CSRF Attacks
        sameSite: "strict",
        // 30-Days
        maxAge: 30 * 24 * 60 * 60 * 1000, 
    })
};


