import jwt from 'jsonwebtoken'
import { Response } from "express" 


const generateTokenAndSetCookie = (userId: any, res: Response) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: '15d'
    })
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000
    })
}

export default generateTokenAndSetCookie