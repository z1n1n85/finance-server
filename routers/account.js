import Router from "express";
import AccountController from "../controllers/account.js";

const AccountRouter = new Router();

AccountRouter.post('/accounts', AccountController.create);
AccountRouter.get('/accounts', AccountController.getAll);
AccountRouter.put('/accounts', AccountController.update);
AccountRouter.delete('/accounts:id', AccountController.delete);

export default AccountRouter; 