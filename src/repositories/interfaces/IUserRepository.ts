// import { UserModel } from "../../shared/models";

import { User } from "../../entities/User";
import { UserModel } from "../../shared/models";
import { IAuthenticateUserDTO } from "../../useCases/UserUseCases/dtos/IAuthenticateUserDTO";
import { IAuthenticateUserResponseDTO } from "../../useCases/UserUseCases/dtos/IAuthenticateUserResponseDTO";

export interface IUserRepository {
    findByEmail(email: string): Promise<User>;
    save(user: User): Promise<User>;
    // login(user: IAuthenticateUserDTO): Promise<IAuthenticateUserResponseDTO>;
}