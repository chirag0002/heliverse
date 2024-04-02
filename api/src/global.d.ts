import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SECRET_KEY: string
        }
    }
}