import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

export class GetUserBallanceUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(id: number) {
        return await this.userRepository.getUserBallance(id);
    }
}