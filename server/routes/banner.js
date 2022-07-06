const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');
const verifyAdminToken = require('../middleware/authAdminMiddleware');


// @route: GET api/banner
// @desc: Get banner
// @access: Public
router.get('/get', async (req, res) => {
    try {
        const banner = await Banner.findOne({})
        res.json({ success: true, banner })
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }
})

// @route: POST api/banners
// @Desc: Add banner 
// @access: Admin
router.put('/add', verifyAdminToken, async (req, res) => {
    const { imageUrl, name, description, url, backgroundColor } = req.body;
    console.log(imageUrl, name, description, url, backgroundColor);
    if (!imageUrl || !name) {
        return res.status(400).json({
            success: false,
            message: "imageUrl and name is required",
        })
    }
    try {
        const parten = /^#[0 - 9a-f]{ 3, 6 } $/
        if (!parten.test(backgroundColor)) {
            backgroundColor = ''
        }

        const newBanner = {
            imageUrl, name, description, url, backgroundColor
        }
        // await newBanner.save()
        await Banner.findOneAndUpdate({}, newBanner)
        res.json({ success: true, newBanner })
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }
})

module.exports = router;
