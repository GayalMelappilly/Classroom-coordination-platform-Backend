import { Request, Response } from "express"
import User from "../models/User.model"
import generateOtp from '../utils/generateOtp'

export const signupWithGoogle = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.user as Express.User
        console.log("GOOGLE SIGNUP : ",data)
        console.log("EMAIL : ",data.email)

        if(data){
            const userCheck = await User.findOne({ email: data.email })
            // console.log(userCheck)
        }

        res.json({msg:"Signup successful", data})

    } catch (error) {
        console.log('ERROR IN GOOGLE SIGNUP')
        res.json({msg:"Error in signup", error})
    }
}

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("OTP : ",generateOtp())
        res.json({ msg: "OTP sent to email" })
    } catch (error) {
        
    }
}

export const signupWithEmailAndPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body.user
        console.log(data)

        const userCheck = await User.findOne({ email: data.email })

        if (userCheck) {
            res.json({ msg: "User already exists." })
        }

        User.create({
            type: "Email",
            fname: data.fname,
            lname: data.lname,
            displayName: data.username,
            email: data.email,
            password: data.password
        }).then(() => {
            console.log('User Created')
            res.json({ msg: 'User Created' })
        }).catch((err: any) => {
            console.log('Error in signup', err)
            res.json({ msg: 'Error in signup', err })
        })
    } catch (error: any) {
        console.log('Error in signup', error)
        res.json({ msg: 'Error in signup', error })
    }
}

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body.user

        console.log(data)

        const userCheck = await User.findOne({ email: data.email })

        if (!userCheck) {
            res.json({ msg: "User does not exist.", validUser: false })
            return
        }

        res.json({ msg: "User exists.", validUser: true })
    } catch (error: any) {
        console.log('Error in signin', error)
        res.json({ msg: 'Error in signin', error })
    }
}