import Router from "express";
import AccountController from "../controllers/account.js";
import checkAuthMiddlewares from "../middlewares/checkAuth.js";

const AccountRouter = new Router();

AccountRouter.post('/accounts', checkAuthMiddlewares, AccountController.create);
AccountRouter.get('/accounts', checkAuthMiddlewares, AccountController.getAll);
AccountRouter.put('/accounts', checkAuthMiddlewares, AccountController.update);
AccountRouter.delete('/accounts:id', checkAuthMiddlewares, AccountController.delete);

export default AccountRouter; 