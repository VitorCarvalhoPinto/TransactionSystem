import express from "express";
import cors from "cors";
import { UserRouter } from "./routes/UserRoutes";
import { TransactionRouter } from "./routes/TransactionRoutes";
import { authMiddleware } from "./middlewares/AuthMiddleware";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/users", UserRouter)
app.use("/transactions", TransactionRouter)

export { app }