import { UserRepository } from "../repositories/UserRepository";
import { hash } from "../utils/hash";
import { compare } from "../utils/hash";
import { sign } from "../utils/jwt";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(username: string, email: string, password: string) {
        const hashedPassword = await hash(password);
        return await this.userRepository.create(username, email, hashedPassword);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            return null;
        }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
            return null;
        }
        
        user.token = sign(user.id);
        return user;
    }
}