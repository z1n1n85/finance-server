import Router from "express";
import TransactionController from "../controllers/transaction.js";
import checkAuthMiddlewares from "../middlewares/checkAuth.js";

const TransactionRouter = new Router();

TransactionRouter.post('/transactions', checkAuthMiddlewares, TransactionController.create);
TransactionRouter.get('/transactions', checkAuthMiddlewares, TransactionController.getAll);
TransactionRouter.put('/transactions', checkAuthMiddlewares, TransactionController.update);
TransactionRouter.delete('/transactions:id', checkAuthMiddlewares, TransactionController.delete);

export default TransactionRouter; 