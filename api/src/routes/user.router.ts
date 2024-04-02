import { Router } from 'express'
import { addUser, deleteUser, getAllUsers, getUser, updateUser, userAuth } from '../controllers/user.controller'

export const app = Router()

app.get('/', getAllUsers)
app.get('/:id', getUser)
app.post('/', addUser)
app.put('/:id', updateUser)
app.delete('/:id', deleteUser)
app.post('/auth', userAuth)