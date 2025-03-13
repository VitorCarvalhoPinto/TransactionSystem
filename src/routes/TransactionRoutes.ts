import { Router } from "express";
import { TransactionRepositorySequelize } from "../repositories/implementations/TransactionRepositorySequelize";
import { CreateTransactionUseCase } from "../useCases/TransactionUseCases/CreateTransactionUseCase";
import { UpdateTransactionUseCase } from "../useCases/TransactionUseCases/UpdateTransactionUseCase";
import { TransactionController } from "../useCases/TransactionUseCases/controllers/TransactionController";
import { GetAllTransactionUseCase } from "../useCases/TransactionUseCases/GetAllTransactionUseCase";
import { GetByUserTransactionUseCase } from "../useCases/TransactionUseCases/GetByUserTransactionUseCase";
import { CreateTransactionCSVUseCase } from "../useCases/TransactionUseCases/CreateTransactionCSVUseCase";
import { UserRepositorySequelize } from "../repositories/implementations/UserRepositorySequelize";
import { authMiddleware } from "../middlewares/AuthMiddleware";
// import multer from "multer";
import { upload } from "../middlewares/uploadMiddleware";

// const upload = multer({ dest: "uploads/" });
const TransactionRouter = Router();

const transactionRepository = new TransactionRepositorySequelize();
const userRepository = new UserRepositorySequelize();

//#endregion UseCases

const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository);
const createTransacitonCSVUseCase = new CreateTransactionCSVUseCase(transactionRepository, userRepository);
const updateTransactionUseCase = new UpdateTransactionUseCase(transactionRepository);
const getAllTransactionUseCase = new GetAllTransactionUseCase(transactionRepository);
const getByUserTransactionUseCase = new GetByUserTransactionUseCase(transactionRepository);

//#region 
const transactionController = new TransactionController(
    createTransactionUseCase,
    createTransacitonCSVUseCase,
    updateTransactionUseCase,
    getAllTransactionUseCase,
    getByUserTransactionUseCase
);

TransactionRouter.post("/create", authMiddleware, (req, res) => {
    transactionController.create(req, res);
});

TransactionRouter.post("/csv", authMiddleware, upload.single("file"), (req, res) => {
    transactionController.csv(req, res)
})

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