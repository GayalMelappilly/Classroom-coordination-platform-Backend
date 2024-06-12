import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connection'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'
import addCurrentIPToWhitelist from './middlewares/whiteListIp'
import './middlewares/passport'
import passport from 'passport'

const app = express()

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
    }
}))

addCurrentIPToWhitelist()

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)
app.use('/user', userRouter)

app.listen(5000, () => {
    connectDB()
    console.log(`Server is running on port 5000`)
})





