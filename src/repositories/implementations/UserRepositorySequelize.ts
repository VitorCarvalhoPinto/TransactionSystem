import { models, UserModel } from "../../shared/models";
import { User } from "../../entities/User";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IAuthenticateUserDTO } from "../../useCases/UserUseCases/dtos/IAuthenticateUserDTO";
import { IAuthenticateUserResponseDTO } from "../../useCases/UserUseCases/dtos/IAuthenticateUserResponseDTO";

export class UserRepositorySequelize implements IUserRepository{
    async findByEmail(email: string): Promise<User> {
        const userModel = await models.User.findOne({ where: { email } });
        if(!userModel) return null;

        return new User({
                name: userModel.name,
                cpf: userModel.cpf,
                email: userModel.email,
                password: userModel.password,
                ballance: userModel.ballance
            });


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