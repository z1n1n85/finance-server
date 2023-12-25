import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import TransactionRouter from "./routers/transactions.js";
import AccountRouter from "./routers/account.js";
import { DB_URL } from "./const/access.js"

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', TransactionRouter);
app.use('/api', AccountRouter);

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Сервер работает с портом ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

startApp();