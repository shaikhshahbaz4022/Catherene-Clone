const express = require('express');
const UserModel = require('../models/usermodel');
const userRouter = express.Router()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const BlackModel = require('../models/Blackmodel');
const { passport } = require('../connection/Google.OAuth');
userRouter.use(express.json())

userRouter.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body
    try {

        const isUserPresent = await UserModel.findOne({ email })
        if (isUserPresent) {
            return res.status(404).send({ msg: "Login Directly , Already Registered" })
        }
        bcrypt.hash(password, 4, async (err, hash) => {
            const user = new UserModel({ name, email, password: hash, role })
            await user.save()
            res.status(201).send({ "msg": "Registration Succesfull" })

        });
    } catch (error) {
        res.status(401).send({ "msg": "Some error occourd while  Registration" })

    }

})



userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (isPasswordMatch) {
                const token = jwt.sign({ userID: user._id, role: user.role }, "privateKey", { expiresIn: '7d' });
                res.status(201).send({ msg: "Login successful", token, userdetails: user });
            } else {
                res.status(401).send({ msg: "Wrong credentials" });
            }
        } else {
            res.status(401).send({ msg: "Login failed, user is not present" });
        }
    } catch (error) {
        res.status(500).send({ msg: "An error occurred while logging in" });
    }
});


userRouter.post("/logout", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, "privateKey")
        const isTokenPresent = await BlackModel.findOne({ token: token })
        if (isTokenPresent) {
            return res.status(404).send({ "msg": "You Have Logout Already" })
        }

        const black = new BlackModel({ token: token })
        await black.save()

        res.send({ "msg": "Logout Succesfully", "ok": true })
    } catch (error) {
        res.status(401).send({ "msg": error.message })

    }
})



userRouter.get("/", async (req, res) => {
    const user = await UserModel.find()
    res.status(201).send(user)
})




userRouter.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false,
    }),
    async function (req, res) {
        try {
            const fetch_user = await UserModel.findOne({ email: req.user.email });
          
          
            if (fetch_user) {
                token_Generator(res, fetch_user.name, fetch_user._id , fetch_user.image);
            } else {
                bcrypt.hash("password", 2, async (err, hash) => {
                    const newUser = new UserModel({
                        name: req.user.name,
                        email: req.user.email,
                        password: hash,
                        image : req.user.avtar
                    });
                    await newUser.save();
                   
                    token_Generator(res, req.user.name, "login with google",req.user.avtar);
                });
            }
        } catch (error) {
            res.status(500).send({ msg: "An error occurred while authenticating with Google" });
        }
    }
);

//---------------- Functions Here -----------------------------------

function token_Generator(res, name, id,image) {
    let token = jwt.sign(
        { user: name, userID: id ,role : "User" },
        "privateKey",
        { expiresIn: "7d" }
    );
    let refreshToken = jwt.sign(
        { user: name, id: id },
        "privateKey",
        { expiresIn: "12d" }
    );
    
    const redirectUrl = `http://127.0.0.1:5500/frontend/index.html?token=${token}&username=${name}&image=${image}`;

    res.redirect(redirectUrl);
}


module.exports = userRouter;














// //------------------- Google Auth Here -----------------------------------------
// userRouter.get(
//     "/auth/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
//     // console.log(profile)
// );
// userRouter.get(
//     "/auth/google/callback",
//     passport.authenticate("google", {
//         failureRedirect: "/login",
//         session: false,
//     }),


//     async function (req, res) {
//         // console.log(user);
//         const fetch_user = await UserModel.findOne({ email: req.user.email });
//         console.log(fetch_user);
//         if (fetch_user) {
//             token_Genretor(res, fetch_user.name, fetch_user._id);
//         } else {
//             bcrypt.hash("password", 2, async (err, hash) => {
//                 const newUser = new UserModel({ name:profile.displayName, email: profile.emails[0].value, password: hash  })
//                 await newUser.save()
//                 // res.status(200).send({ msg: "Registration successful", newUser })
//                 token_Genretor(res, req.user.name, "login with google");
//             })
//         }
//     }
// );

// //----------------Functions Here -----------------------------------

// function token_Genretor(res, name, id) {
//     let token = jwt.sign(
//       { user: name, userID: id },
//       "privateKey",
//       { expiresIn: "6s" }
//     );
//     let refreshToken = jwt.sign(
//       { user: name, id: id},
//       "privateKey",
//       { expiresIn: "120s" }
//     );
//     res.cookie("token", token);
//     res.redirect("http://127.0.0.1:5500/frontend/index.htmll")
//     // res.status(202).json({ refreshToken });
//   }

// userRouter.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', "email"] }));

// userRouter.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     async function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('http://127.0.0.1:5500/frontend/index.html');
//     });
module.exports = userRouter