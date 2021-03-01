import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {

    constructor(
        // declarando e inicializando a variavel usersRepository
        private usersRepository: IUserRepository,
        private mailProvider: IMailProvider
    ) { }

    async execute(data: ICreateUserRequestDTO) {
        const userAlredyExists = await this.usersRepository.findByEmail(data.email);
        if (userAlredyExists) {
            throw new Error('User already exists .');
        }
        console.log(data.name);
        const user = new User(data);
        await this.usersRepository.save(user);
        console.log('User save, user:' + JSON.stringify(data));
        await this.mailProvider.sendMail(
            {
                to: { name: data.name, email: data.email },
                from: { name: 'Equipe do Meu App', email: 'iassiavitor@gmail.com' },
                subject: `Seja Bem-Vindo! ${data.name}- A nossa plataforma`,
                body: '<p> Você já pode fazer login em nossa plataforma. <p>'
            }
        );
    }

}