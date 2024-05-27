import mongoose, { Schema, model } from 'mongoose'

interface IUser {
    name: string,
    email: string
}

const userSchema = new Schema<IUser>({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    }
})

const User =  mongoose.model<IUser>('User', userSchema)

export default User