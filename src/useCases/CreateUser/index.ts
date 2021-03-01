import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { SqlUsersRepository } from "../../repositories/implementations/SQLUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";


const sqlUsersRepository = new SqlUsersRepository()
const mailtrapMailProvider = new MailtrapMailProvider()

const createUserUseCase = new CreateUserUseCase(
    sqlUsersRepository,
    mailtrapMailProvider
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserUseCase, createUserController }