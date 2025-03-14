// import { UserModel } from "../../shared/models";

import { User } from "../../entities/User";
import { UserModel } from "../../shared/models";
import { IUserResponseDTO } from "../../useCases/UserUseCases/dtos/IUserResponseDTO";

export interface IUserRepository {
    findByEmail(email: string): Promise<IUserResponseDTO>;
    findByCPF(cpf: string): Promise<IUserResponseDTO>;
    getUserBallance(id_user: number): Promise<number>;
    save(user: User): Promise<User>;
}