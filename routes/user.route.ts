import express from 'express'
import { addUser } from '../controllers/user.controller'

const router = express.Router()

router.post('/add', addUser)


export default router