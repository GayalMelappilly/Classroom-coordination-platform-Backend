import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connection'

const app = express()

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.listen(5000, () => {
    connectDB()
    console.log(`Server is running on port 5000`)
})





