const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");


const client_id = process.env.Client_ID
const client_secret = process.env.Client_Secret

passport.use(
    new GoogleStrategy(
        {
            clientID: client_id,
            clientSecret: client_secret,
            callbackURL: "http://localhost:8080/users/auth/google/callback",
        },
        async function (accessToken, refreshToken, profile, cb) {
            let user = {
                name: profile._json.name,
                email: profile._json.email,
                password: uuidv4(),
                avtar: profile._json.picture,
            };
            return cb(null, user);
        }
    )
);

module.exports = { passport };