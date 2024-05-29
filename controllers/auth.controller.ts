import { Request, Response } from "express"
import User from "../models/User.model"

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body.user
        console.log(data)

        const userCheck = await User.findOne({email: data.email})

        if(userCheck){
            res.json({msg:"User already exists."})
        }
        
        User.create({
            fname: data.fname,
            lname: data.lname,
            username: data.username,
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