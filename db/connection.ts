import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI as string)
            console.log("Connected to Database")
    } catch (error) {
        console.log('Connection to database failed. Err : ',error)
    }
}

export default connectDB