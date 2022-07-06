const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Admin = require('../models/Admin');
const accessTokenLifetime = 1000 * 60 * Number(process.env.ACCESS_TOKEN_TIMELIFE)
const refreshTokenLifetime = 1000 * 60 * 60 * 24 * Number(process.env.REFRESH_TOKEN_TIMELIFE)

// route: POST api/auth/register
// desc: Register Admin
// access: Public
router.post('/register', async (req, res) => {
    const { adminname, password, email } = req.body;
    console.log(adminname, password, email);
    // simple validate
    if (!adminname || !password || !email) {
        return res.status(400).json({
            success: false,
            message: "Missing adminname and/or password"
        })
    }


    try {
        // check exist adminname
        const admin = await Admin.findOne({ adminname });
        if (admin) {
            return res.status(400).json({
                success: false,
                message: "Adminname already existed"
            })
        }

        // All good
        // hash password
        const hashPassword = await argon2.hash(password);
        const newAdmin = new Admin({ adminname, password: hashPassword, email });
        console.log(newAdmin);
        // save admin data to database
        await newAdmin.save();

        // Return access token
        const accessToken = jwt.sign({
            adminId: newAdmin._id
        },
            process.env.ADMIN_ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )
        // Return refresh token
        const refreshToken = jwt.sign({
            adminId: newAdmin._id
        },
            process.env.ADMIN_ACCESS_TOKEN_SECRET,
            { expiresIn: '60d' }
        )

        // Save cookie
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


        res.json({ success: true, message: 'Admin created successfully', accessToken })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})


// route: POST api/auth/register
// desc: Register Admin
// access: Public
router.post('/login', async (req, res) => {
    const { adminname, password } = req.body;

    // Simple validate
    if (!adminname || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing adminname and/or password"
        })
    }

    try {
        // Check adminname
        const admin = await Admin.findOne({ adminname })
        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Incorrect adminname or password"
            })
        }

        // Check password
        const passwordValid = await argon2.verify(admin.password, password)
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect adminname or password"
            })
        }

        // All good
        // Return token
        const accessToken = jwt.sign({
            adminId: admin._id
        },
            process.env.ADMIN_ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )
        // Return refresh token
        const refreshToken = jwt.sign({
            adminId: admin._id
        },
            process.env.ADMIN_ACCESS_TOKEN_SECRET,
            { expiresIn: '60d' }
        )


        // Save token to cookie
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
        res.json({ success: true, message: 'Logged in successfully', accessToken })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})



module.exports = router;