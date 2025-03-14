import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase ";
import { CreateUserUseCase } from "../CreateUserUseCase";
import { Request, Response } from "express";
import { GetUserBallanceUseCase } from "../GetUserBallanceUseCase";

export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private loginUseCase: AuthenticateUserUseCase,
        private getUserBallance: GetUserBallanceUseCase
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
            return res.status(400).json({ message: e.message });
        }
    }

    async getBallance(req: Request, res: Response): Promise<Response> {
        try{
            const { id } = req.params
            const ballance = await this.getUserBallance.execute(Number(id));
            return res.status(200).json(ballance);
        } catch(e) {
            return res.status(400).json({ message: e.message });
        }
    }
}