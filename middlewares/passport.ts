import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.model';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: `${process.env.APP_URI}/auth/google/callback`,
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = new User({
                    type: 'google',
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails && profile.emails[0].value,
                    image: profile.photos && profile.photos[0].value
                });
                await user.save();
            }
            return done(null, user);
        } catch (error) {
            console.error("ERROR IN PASSPORT.JS", error);
            return done(error);
        }
    }
));

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
