import { Router } from "express"
import { app as userRouter } from './user.router'
import { app as teamRouter } from './team.router'

export const app = Router()

app.use('/users', userRouter)
app.use('/team', teamRouter)