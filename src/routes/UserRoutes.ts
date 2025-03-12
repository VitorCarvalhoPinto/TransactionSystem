import { Router } from "express";
import { UserRepositorySequelize } from "../repositories/implementations/UserRepositorySequelize";
import { CreateUserUseCase } from "../useCases/UserUseCases/CreateUserUseCase";
import { UserController } from "../useCases/UserUseCases/controllers/UserController";

const UserRouter = Router();

const userRepository = new UserRepositorySequelize();
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

UserRouter.post("/register", (req, res) => {
  userController.create(req, res);
});

export { UserRouter }