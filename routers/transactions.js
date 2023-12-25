import Router from "express";
import TransactionController from "../controllers/transaction.js";

const TransactionRouter = new Router();

TransactionRouter.post('/transactions', TransactionController.create);
TransactionRouter.get('/transactions', TransactionController.getAll);
TransactionRouter.put('/transactions', TransactionController.update);
TransactionRouter.delete('/transactions:id', TransactionController.delete);

export default TransactionRouter; 