import { Router } from "express";
import { TransactionRepositorySequelize } from "../repositories/implementations/TransactionRepositorySequelize";
import { CreateTransactionUseCase } from "../useCases/TransactionUseCases/CreateTransactionUseCase";
import { UpdateTransactionUseCase } from "../useCases/TransactionUseCases/UpdateTransactionUseCase";
import { TransactionController } from "../useCases/TransactionUseCases/controllers/TransactionController";
import { GetAllTransactionUseCase } from "../useCases/TransactionUseCases/GetAllTransactionUseCase";
import { GetByUserTransactionUseCase } from "../useCases/TransactionUseCases/GetByUserTransactionUseCase";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const TransactionRouter = Router();

const transactionRepository = new TransactionRepositorySequelize();

//#endregion UseCases

const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository);
const updateTransactionUseCase = new UpdateTransactionUseCase(transactionRepository);
const getAllTransactionUseCase = new GetAllTransactionUseCase(transactionRepository);
const getByUserTransactionUseCase = new GetByUserTransactionUseCase(transactionRepository);

//#region 
const transactionController = new TransactionController(
    createTransactionUseCase,
    updateTransactionUseCase,
    getAllTransactionUseCase,
    getByUserTransactionUseCase
);

TransactionRouter.post("/create", authMiddleware, (req, res) => {
    transactionController.create(req, res);
});

TransactionRouter.put("/update/:id", authMiddleware, (req, res) => {
    transactionController.updateStatus(req, res);
});

TransactionRouter.get("/all", authMiddleware, (req, res) => {
    transactionController.getAll(req, res);
});

TransactionRouter.get("/user/:id_user", authMiddleware, (req, res) => {
    transactionController.getByUser(req, res);
});

export { TransactionRouter }