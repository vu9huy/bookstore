const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const verifyAdminToken = require('../middleware/authAdminMiddleware');


// @route: GET api/books
// @desc: Get all books
// @access: Public
router.get('/getall', async (req, res) => {
    try {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 25;
        const skip = Math.abs(limit * (page - 1));
        // const books = await Book.find()
        const books = await Book.find().sort('date').limit(limit).skip(skip)
        return res.json({ success: true, books })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error")
    }
})


// @route: GET api/books
// @desc: get one book
// @access: Public
router.get('/getone/:id', async (req, res) => {
    try {
        // const books = await Book.find()
        const bookId = req.params.id;
        const book = await Book.findOne({ _id: bookId })
        // console.log(book);
        return res.json({ success: true, book })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error")
    }
})


// @route: POST api/books
// @desc: Add book
// @access: Admin
router.post('/add', verifyAdminToken, async (req, res) => {
    const { imageUrl, productName, productLink, productPrice, author, bookLayout, desc, publishYear, publisher, qtyOfPage, size, suplier, tag, translator, weight, sale, adminId } = req.body;
    console.log('adminId', adminId);
    // Simple validation
    if (!productName || !productPrice || !author || !qtyOfPage || !tag) {
        return res.status(400).json({
            success: false,
            message: "Product name, product price, author, publish year, number of pages and tag is required"
        })
    }


    try {
        const newBook = new Book({
            imageUrl: imageUrl || '',
            productName,
            productPrice,
            productLink,
            author,
            bookLayout: bookLayout || '',
            desc: desc || [],
            publishYear: publishYear || '',
            publisher: publisher || '',
            qtyOfPage,
            size: size || '',
            suplier: suplier || '',
            tag,
            translator: translator || '',
            weight: weight || '',
            sale: sale || 0
        })

        await newBook.save();
        // await newBook.insertOne();
        res.json({ success: true, message: "Book is added", newBook })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error")
    }

})

// @route: EDIT api/books
// @desc: edit one book
// @access: Admin
router.put('edit/:id', verifyAdminToken, async (req, res) => {
    const { imageUrl, productName, productLink, productPrice, author, bookLayout, desc, publishYear, publisher, qtyOfPage, size, suplier, tag, translator, weight, sale } = req.body;

    // Simple validation
    if (!productName || !productPrice || !author || !qtyOfPage || !tag) {
        return res.status(400).json({
            success: false,
            message: "Product name, product price, image, author, publish year, number of pages and tag is required"
        })
    }

    try {
        const editBook = {
            imageUrl,
            productName,
            productPrice,
            productLink,
            author,
            bookLayout,
            desc,
            publishYear,
            publisher,
            qtyOfPage,
            size,
            suplier,
            tag,
            translator,
            weight,
            sale
        }

        const editBookCondition = { _id: req.params.id };

        editedPost = await Book.findByIdAndUpdate(editBookCondition, editBook)

        if (!editedPost) {
            res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        res.json({ success: true, message: "Book is edited", editBook })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error")
    }

})



// @route: DELETE api/books
// @desc: delete one book
// @access: Admin
router.delete('delete/:id', verifyAdminToken, async (req, res) => {
    try {
        const postDeleteCongition = { _id: req.params.id };
        const deletePost = await Book.findOneAndDelete(postDeleteCongition);

        if (!deletePost) {
            return res.statusMessage(401).json({
                success: false,
                message: 'Book not found'
            })
        }
        res.json({
            success: true,
            deletePost
        })

    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error")
    }
})


router.get('/search', async (req, res) => {
    try {
        const productName = req.query.productName;

        if (!productName) {
            return res.status(401).json({
                success: false,
                message: 'Query string in valid'
            })
        }
        console.log(productName);
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 25;
        const skip = Math.abs(limit * (page - 1));
        const books = await Book.find({ productName: { $regex: productName } }).sort('date').limit(limit).skip(skip)
        return res.json({ success: true, books })

    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error")
    }
})

// router.get('/search/advance', async (req, res) => {
//     try {
//         const searchData = req.query;
//         const { productName } = searchData

//         const books = await Book.find({ productName: { $regex: productName } })
//         return res.json({ success: true, books })

//     } catch (error) {
//         console.log(error);
//         res.status(500).json("Internal server error")
//     }
// })


module.exports = router;