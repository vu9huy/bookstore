const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');
const verifyAdminToken = require('../middleware/authAdminMiddleware');


// @route: GET api/tags
// @Desc: get tag
// @access: Admin
router.get('/getall', verifyAdminToken, async (req, res) => {
    try {
        const tags = await Tag.find()
        res.json({ success: true, tags })
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }

})


// @route: POST api/tags
// @Desc: Add tag 
// @access: Admin
router.post('/add', verifyAdminToken, async (req, res) => {
    const { adminId, tagName } = req.body;
    if (!tagName) {
        return res.status(400).json({
            success: false,
            message: "tagName is required"
        })
    }
    try {
        const newTag = new Tag({
            tagName
        })
        await newTag.save();
        res.json({ success: true, newTag })
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }
})

// @route: DELETE api/tags
// @Desc: Remove tag
// @access: Admin
router.delete('/delete/:id', verifyAdminToken, async (req, res) => {
    try {
        const deleteTagParam = { _id: req.params.id };
        const deleteTag = await Tag.findByIdAndDelete(deleteTagParam);
        if (!deleteTag) {
            return res.status(401).json({
                success: false,
                message: 'Tag not found'
            })
        }
        res.json({
            success: true,
            deleteTag
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error")

    }
})






module.exports = router;