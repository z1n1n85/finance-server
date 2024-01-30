import Router from "express";
import {body} from 'express-validator';
import UserCotroller from "../controllers/user.js";

const AuthorizationRouter = new Router();

AuthorizationRouter.post('/registration', 
  body('email').isEmail(),
  body('password').isLength({min: 6, max: 32}),
  UserCotroller.registration
);
AuthorizationRouter.post('/login', UserCotroller.login);
AuthorizationRouter.post('/logout', UserCotroller.logout);
AuthorizationRouter.get('/activate/:link', UserCotroller.activate);
AuthorizationRouter.get('/refresh', UserCotroller.refresh);

export default AuthorizationRouter; 