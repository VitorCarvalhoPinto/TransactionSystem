import { Router } from "express";
import { UserRepositorySequelize } from "../repositories/implementations/UserRepositorySequelize";
import { CreateUserUseCase } from "../useCases/UserUseCases/CreateUserUseCase";
import { UserController } from "../useCases/UserUseCases/controllers/UserController";
import { AuthenticateUserUseCase } from "../useCases/UserUseCases/AuthenticateUserUseCase ";

const UserRouter = Router();

const userRepository = new UserRepositorySequelize();
const createUserUseCase = new CreateUserUseCase(userRepository);

const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

const userController = new UserController(createUserUseCase, authenticateUserUseCase);

UserRouter.post("/register", (req, res) => {
  userController.create(req, res);
});

UserRouter.post("/login", (req, res) => {
  userController.login(req, res)
})

export { UserRouter }