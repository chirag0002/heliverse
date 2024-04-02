import { NextFunction, Request, Response } from "express"
import { verify, VerifyErrors } from "jsonwebtoken"
import { User } from "../db/db"

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']

    if (!token) return res.status(401).json({ message: 'No auth token provided' })

    verify(token, process.env.SECRET_KEY, async (err: VerifyErrors | null, decoded: any) => {
        if (err) return res.status(401).json({ message: 'Invalid auth token' })

        try {
            const user = await User.findOne({ email: decoded.email })
            if (!user) return res.status(404).json({ message: 'User not found' })

            req.user = user
            next()
        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    })
}