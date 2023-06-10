import { Users } from "../models/Users.js";
import { genToken } from "../middleware/genToken.js";

class UserClass {
    Register = async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            const userExists = await Users.findOne({ email });
            if (userExists) {
                res.status(400);
                throw new Error("That User already exists");
            }
            const user = await Users.create({
                name, email, password
            });
            if (user) {
                genToken(res, user._id);
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email
                })
            }
        } catch (error) {
            res.status(401).json(error);
            next(error);
        }
    };

    GetAll = async (req, res, next) => {
        try {
            await Users
            .find()
            .then((users) => res.status(201)
            .json(users));
        } catch (error) {
            res.status(401).json(error);
            next(error);
        }
    };

    Login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });
            await user.matchPassword(password)
            genToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
            })
        } catch (error) {
            res.status(401).json(error);
            next(error);
        }
    };

    Logout = async (req, res, next) => {
        try {
            res.cookie("jwt", "", {
                httpOnly: true,
                expires: new Date(0),
            });
            res.status(200)
            .json({msg: "User Logged Out!"});
        } catch (error) {
            res.status(401).json(error);
            next(error);
        }
    };

    Profile = async (req, res, next) => {
        try {
            const user = await Users
            .findById(req.user._id);
            if (user) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email
                })
            }
        } catch (error) {
            res.status(401).json(error);
            next(error);
        }
    };

    Update = async (req, res, next) => {
        try {
            const user = await Users.findById(req.user._id);
            if (user) {
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                if (req.body.password) {
                    user.password = req.body.password;
                }
                const updatedUser = await user.save();
                res.status(201).json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email
                })
            };
        } catch (error) {
            res.status(401).json(error);
            next(error);
        }
    };
};

export const USERS = new UserClass();




