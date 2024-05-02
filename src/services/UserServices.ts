import { UserRepository } from "../repositories/UserRepository";
import { hash } from "../utils/hash";
import { compare } from "../utils/hash";
import { ElysiaJwt, ElysiaSet, IUser } from "../types";
import { Cookie } from "elysia";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(username: string, email: string, password: string) {
        const hashedPassword = await hash(password);
        return await this.userRepository.create(username, email, hashedPassword);
    }

    async login(email: string, password: string, jwt: ElysiaJwt, auth: Cookie<any>) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return null;
        }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
            return null;
        }

        user.token = await jwt.sign({ id: user.id, email: user.email, password: user.password });

        auth.set({
            value: user.token,
            httpOnly: true,
            maxAge: 7 * 86400,
            path: "/"
        });

        return user;
    }

    async getProfile(set: ElysiaSet, jwt: ElysiaJwt, auth: Cookie<any>) {
        const user: Partial<IUser> = await jwt.verify(auth.value) as Partial<IUser>;
        
        if (!user) {
            set.status = 401;
            return {
                error: "Unauthorized"
            };
        }
        
        const foundUser = await this.userRepository.findByEmail(user.email!);
        if (!foundUser) {
            set.status = 401;
            return {
                error: "Unauthorized"
            };
        }
        
        if (foundUser.password !== user.password) {
            set.status = 401;
            return {
                error: "Unauthorized"
            };
        }
        
        return foundUser;
    }
}