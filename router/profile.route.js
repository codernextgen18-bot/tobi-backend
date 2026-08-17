import express from "express";
import ProfileController from "../controller/profile.controller.js";

const Router = express.Router();

Router.patch('/profile/details', ProfileController.updateProfileDetails);
Router.patch('/profile/password', ProfileController.updatePassword);

export default Router;