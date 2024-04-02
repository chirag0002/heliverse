import { Router } from 'express'
import { auth } from '../middlewares/auth.middleware'
import { addUser, createTeam, deleteTeam, getMyTeams, getTeam, removeUser } from '../controllers/team.controller'

export const app = Router()

app.post('/', auth, createTeam)
app.get('/', auth, getMyTeams)
app.put('/:teamId/add-users', auth, addUser)
app.put('/:teamId/remove-users', auth, removeUser)
app.get('/:teamId', getTeam)
app.delete('/:teamId', auth, deleteTeam)