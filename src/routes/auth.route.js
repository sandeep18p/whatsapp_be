import express from "express";
import {register, login, logout, refreshToken} from "../controllers/auth.controllers.js"
import trimRequest from "trim-request";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(trimRequest.all,register);
router.route("/login").post(trimRequest.all,login);
router.route("/logout").post(trimRequest.all,logout);
router.route("/refreshtoken").post(trimRequest.all,refreshToken);
router.route("/testingauthMiddlware").get(trimRequest.all, authMiddleware, (req, res)=> {
    res.send(req.user);
    // res.send("hello");
});
export default router; 