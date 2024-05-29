import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connection'
import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'
import addCurrentIPToWhitelist from './middlewares/whiteListIp'

const app = express()

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}))

addCurrentIPToWhitelist()

app.use('/auth', authRouter)
app.use('/user', userRouter)

app.listen(5000, () => {
    connectDB()
    console.log(`Server is running on port 5000`)
})





