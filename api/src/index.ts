import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { app as router } from './routes/routes'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})