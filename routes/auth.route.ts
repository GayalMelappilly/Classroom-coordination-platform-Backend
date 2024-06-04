import express from 'express'
import { signin, signup } from '../controllers/auth.controller'
import passport from 'passport'

const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }), (req, res, next) => {
    next()
})
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failure' }), signup)

export default router