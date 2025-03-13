import { models, UserModel } from "../../shared/models";
import { User } from "../../entities/User";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IAuthenticateUserDTO } from "../../useCases/UserUseCases/dtos/IAuthenticateUserDTO";
import { IAuthenticateUserResponseDTO } from "../../useCases/UserUseCases/dtos/IAuthenticateUserResponseDTO";
import { IUserResponseDTO } from "../../useCases/UserUseCases/dtos/IUserResponseDTO";

export class UserRepositorySequelize implements IUserRepository{
    async findByEmail(email: string): Promise<IUserResponseDTO> {
        return await models.User.findOne({ where: { email } });
    }

    async findByCPF(cpf: string): Promise<IUserResponseDTO> {
        return await models.User.findOne({ where: { cpf } });
    }

    async save(user: Partial<User>): Promise<User> {
        const newUser = await models.User.create(user);

        return new User({
            name: newUser.name, 
            cpf: newUser.cpf, 
            email: newUser.email, 
            password: newUser.password, 
            ballance: newUser.ballance
        });
    }
}