import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase ";
import { CreateUserUseCase } from "../CreateUserUseCase";
import { Request, Response } from "express";

export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private loginUseCase: AuthenticateUserUseCase
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        try{
            const user = await this.createUserUseCase.execute(req.body);
            return res.status(201).json(user);
        } catch(e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try{
            const user = await this.loginUseCase.execute(req.body);
            return res.status(200).json(user);
        } catch(e) {
            console.log("user")
            return res.status(400).json({ message: e.message });
        }
    }
}