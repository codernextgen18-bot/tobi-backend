import express from "express";
import authController from "../auth/auth.controller.js";

const Router = express.Router();

Router.post('/auth/register', authController.register);
Router.post('/auth/login', authController.login);
Router.post('/auth/logout', authController.logout);
Router.post('/auth/accesstoken', authController.accessToken);

export default Router;