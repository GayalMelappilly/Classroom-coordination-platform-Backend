import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {

    const uri = process.env.MONGO_DB_URI as string
    console.log('URI : ', uri)

    try {
        await mongoose.connect(uri, {
            ssl: true,
          })
            console.log("Connected to Database")
    } catch (error) {
        console.log('Connection to database failed. Err : ',error)
    }
}

export default connectDB