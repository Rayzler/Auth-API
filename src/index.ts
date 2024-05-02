import { Elysia } from "elysia";
import userRouter from "./routes/user";

const PORT = +(Bun.env.PORT || 3000);
const app = new Elysia()
    .get("/", () => "Hello Elysia")
    .group("/api/v1/auth", userRouter)
    .listen(PORT, (server) => console.log(`🦊 Elysia is running at ${server?.hostname}:${server?.port}`));