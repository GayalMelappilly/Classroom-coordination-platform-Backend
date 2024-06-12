import jwt from 'jsonwebtoken'
import { Response } from "express" 


const generateTokenAndSetCookie = (user: object, res: Response):void => {
    const token = jwt.sign({user} , process.env.JWT_SECRET as string, {
        expiresIn: '15d'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000
    })
    console.log("Token generated")
}

export default generateTokenAndSetCookie