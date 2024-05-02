import { PrismaClient } from "@prisma/client";
import User from "../entities/User";

export class UserRepository {
    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    async create(username: string, email: string, password: string) {
        const user = await this.db.user.create({
            data: {
                username,
                email,
                password
            }
        });

        return new User(user.id, user.username, user.email, user.password);
    }

    async findByEmail(email: string) {
        const user = await this.db.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return null;
        }

        return new User(user.id, user.username, user.email, user.password);
    }
}