import mongoose, { Schema, model } from 'mongoose'

interface IUser {
    fname: string,
    lname: string,
    username: string,
    email: string,
    password: string,
    verified: boolean
}

const userSchema = new Schema<IUser>({
    fname:{
        type:String,
        required: true
    },
    lname:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    verified:{
        type:Boolean,
        default: false
    }
})

const User =  mongoose.model<IUser>('User', userSchema)

export default User