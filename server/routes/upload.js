const express = require('express');
const router = express.Router();
const verifyAdminToken = require('../middleware/authAdminMiddleware');
const uploadFile = require('../util/presignedUrl');
const { eventNames } = require('../models/Book');



// @route: PUT api/upload
// @Desc: get tag
// @access: Admin
router.get('/geturl', async (req, res) => {
    try {
        const name = req.query.name;
        const result = await uploadFile(name);
        console.log('name', name);
        res.json({
            sucess: true,
            messeage: 'Get url success',
            result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }

})

router.post('/add', async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }

})

module.exports = router;
