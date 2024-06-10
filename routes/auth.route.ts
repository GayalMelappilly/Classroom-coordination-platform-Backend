import express from 'express'
import { signin, signupWithGoogle, signupWithEmailAndPassword } from '../controllers/auth.controller'
import passport from 'passport'

const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }), (req, res, next) => {
    next()
})
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failure' }), signupWithGoogle)

router.post('/signup-with-email-and-password', signupWithEmailAndPassword)

export default router