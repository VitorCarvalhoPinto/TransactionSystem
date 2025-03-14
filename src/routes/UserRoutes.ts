import { Router } from "express";
import { UserRepositorySequelize } from "../repositories/implementations/UserRepositorySequelize";
import { CreateUserUseCase } from "../useCases/UserUseCases/CreateUserUseCase";
import { UserController } from "../useCases/UserUseCases/controllers/UserController";
import { AuthenticateUserUseCase } from "../useCases/UserUseCases/AuthenticateUserUseCase ";
import { GetUserBallanceUseCase } from "../useCases/UserUseCases/GetUserBallanceUseCase";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const UserRouter = Router();

const userRepository = new UserRepositorySequelize();

const createUserUseCase = new CreateUserUseCase(userRepository);
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const getUserBallance = new GetUserBallanceUseCase(userRepository);

const userController = new UserController(
  createUserUseCase, 
  authenticateUserUseCase,
  getUserBallance
);

UserRouter.post("/register", (req, res) => {
  userController.create(req, res);
});

UserRouter.post("/login", (req, res) => {
  userController.login(req, res);
});

UserRouter.get("/ballance/:id", authMiddleware, (req, res) => {
  userController.getBallance(req, res);
})

export { UserRouter }