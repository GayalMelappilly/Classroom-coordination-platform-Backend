import mongoose, { Schema, model } from 'mongoose'

interface IUser {
    type:string,
    googleId?:string,
    fname?: string,
    lname?: string,
    displayName: string,
    email: string,
    image?: string,
    password?: string,
    verified?: boolean
}

const userSchema = new Schema<IUser>({
    type:{
        type:String,
        required:true
    },
    googleId:{
        type:String,
    },
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    displayName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    password:{
        type:String,
    },
    verified:{
        type:Boolean,
    }
})

const User =  mongoose.model<IUser>('User', userSchema)

export default User