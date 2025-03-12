import express from "express";
import cors from "cors";
import { UserRouter } from "./routes/UserRoutes";
import { TransactionRouter } from "./routes/TransactionRoutes";

const app = express()

app.use(express.json())
app.use(cors());
app.use("/users", UserRouter)
app.use("/transactions", TransactionRouter)

export { app }