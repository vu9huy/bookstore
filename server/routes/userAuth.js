const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

const accessTokenLifetime = 1000 * 60 * Number(process.env.ACCESS_TOKEN_TIMELIFE)
const refreshTokenLifetime = 1000 * 60 * 60 * 24 * Number(process.env.REFRESH_TOKEN_TIMELIFE)


// generate token function
const generateToken = payload => {
    // Return access token
    const accessToken = jwt.sign(
        payload
        ,
        process.env.USER_ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )
    // Return refresh token
    const refreshToken = jwt.sign(
        payload
        ,
        process.env.USER_ACCESS_TOKEN_SECRET,
        { expiresIn: '60d' }
    )
    return { accessToken, refreshToken }
}

// update token function
const updateRefreshToken = async (payload, refreshToken) => {
    await User.findOneAndUpdate(payload, refreshToken)
}

// Save cookie
const saveCookie = async (res, accessToken, refreshToken) => {
    res
        .cookie('accessToken', accessToken, {
            maxAge: accessTokenLifetime,
            httpOnly: true,
            secure: true
        })
        .cookie('refreshToken', refreshToken, {
            maxAge: refreshTokenLifetime,
            httpOnly: true,
            secure: true
        })

}


// route: POST api/auth/register
// desc: Register User
// access: Public
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    console.log(username, password, email);
    // simple validate
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing username and/or password"
        })
    }


    try {
        // check exist username
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Username already existed"
            })
        }

        // All good
        // hash password
        const hashPassword = await argon2.hash(password);


        const newUser = new User({ username, password: hashPassword, email, card: [], emailVerified: false, phone: '', address: {} });
        // save user data to database
        await newUser.save();
        // Return token
        const { accessToken, refreshToken } = generateToken({ userId: newUser._id })

        // Save cookie
        saveCookie(res, accessToken, refreshToken)

        await updateRefreshToken({ _id: newUser._id }, { refreshToken })

        res.json({ success: true, message: 'User created successfully', accessToken, refreshToken })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})



// route: POST api/auth/register
// desc: Register User
// access: Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Simple validate
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing username and/or password"
        })
    }

    try {
        // Check username
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password"
            })
        }

        // Check password
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password"
            })
        }

        // All good
        // Return token
        const { accessToken, refreshToken } = generateToken({ userId: user._id })

        // Save cookie
        saveCookie(res, accessToken, refreshToken)
        await updateRefreshToken({ _id: user._id }, { refreshToken })
        res.json({ success: true, message: 'Logged in successfully', accessToken, refreshToken })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})

router.delete('/logout', async (req, res) => {

})

router.post('/token', async (req, res) => {
    const refreshTokenSend = req.body.refreshToken;
    // console.log('refreshToken', refreshToken);
    if (!refreshTokenSend) {
        return res.status(404).message('Not found refresh token')
    }

    try {
        try {
            const decoded = jwt.verify(refreshTokenSend, process.env.USER_ACCESS_TOKEN_SECRET)
        } catch (error) {
            res.status(403).json("Invalid token")
        }

        const user = await User.findOne({ refreshToken: refreshTokenSend });
        console.log(user);
        if (!user) {
            return res.status(403).json("Expired token")
        }

        // return token
        const { accessToken, refreshToken } = generateToken({ userId: user._id })
        // update token
        await updateRefreshToken({ _id: user._id }, { refreshToken })
        // save cookie
        saveCookie(res, accessToken, refreshToken)
        res.json({ success: true, message: 'Token is changed', accessToken, refreshToken })

    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error")
    }

})


module.exports = router;