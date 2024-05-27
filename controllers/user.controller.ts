import { Request, Response } from "express"
import User from '../models/User.models'

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("REACHED")
        const body = req.body
        
        await User.create({
            name : req.body.name,
            email : req.body.email
        })
        console.log(body)
        res.json("REACHED")
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}