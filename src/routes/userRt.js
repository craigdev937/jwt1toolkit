import express from "express";
import { protect } from "../middleware/authMid.js";
import { USERS } from "../controllers/userCon.js";

export const userRt = express.Router();
    userRt.post("/register", USERS.Register);
    userRt.get("/", USERS.GetAll);
    userRt.post("/login", USERS.Login);
    userRt.post("/logout", USERS.Logout);
    userRt.get("/profile", protect, USERS.Profile);
    userRt.put("/profile", protect, USERS.Update);


    