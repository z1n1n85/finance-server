import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import cors from "cors";
import TransactionRouter from "./routers/transactions.js";
import AccountRouter from "./routers/account.js";
import AuthorizationRouter from "./routers/authorization.js";
import errorMiddlewares from "./middlewares/error.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:process.env.CLIENT_URL, 
  credentials:true,
  optionSuccessStatus:200
}));
app.use('/api', TransactionRouter);
app.use('/api', AccountRouter);
app.use('/api', AuthorizationRouter);
app.use(errorMiddlewares);

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`Сервер работает с портом ${PORT}. URL клиента: ${process.env.CLIENT_URL}`));
  } catch (error) {
    console.log(error);
  }
}

startApp();