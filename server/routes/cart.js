const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyUserToken = require('../middleware/authUserMiddleware');

// @route: GET api/carts
// @Desc: GET all cart
// @access: User
router.get('/getall', verifyUserToken, async (req, res) => {
    const userId = req.body.userId;
    try {
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
        const user = await User.findOne({ _id: userId });
        const cart = user.cart;
        console.log(user);
        console.log(cart);
        res.json({
            success: true,

        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error")
    }
})


// @route: POST api/carts
// @Desc: Add book to cart
// @access: User
router.post('/add', verifyUserToken, async (req, res) => {
    const { userId, addCart } = req.body;
    // console.log('userId-cart', userId, cart);
    if (!addCart || addCart.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Please select books to add to cart',

        })
    }

    try {
        const user = await User.findById({ _id: userId });
        const cartUser = user.cart;
        // console.log('cartUser', cartUser);
        let newCart = [];
        addCart.map(addBook => {
            const matchBook = cartUser.filter(book => book.bookId === addBook.bookId)

            const index = cartUser.indexOf(matchBook[0]);
            if (index > -1) {
                cartUser.splice(index, 1);
            }
            if (matchBook.length === 0) {
                newCart.push(addBook)
                console.log('addBook', addBook);
                return
            }


            const newBookCart = { ...matchBook[0], amount: matchBook[0].amount + addBook.amount }
            console.log('newBookCart', newBookCart);
            newCart.push(newBookCart)
            console.log('matchBook', newBookCart);
        })
        console.log('cartUser', cartUser);
        newCart = [...newCart, ...cartUser]
        console.log('newCart', newCart);

        user.cart = newCart;
        console.log('newCart', newCart);
        await User.findByIdAndUpdate({ _id: userId }, user);
        res.json({
            success: true,
            message: "Books are added",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error")
    }
})

// @route: PUT api/carts
// @Desc: Remove book to cart by id
// @access: User
router.put('/remove', verifyUserToken, async (req, res) => {
    const { userId, deleteCart } = req.body;
    // console.log('userId-deleteCart', userId, deleteCart);
    if (!deleteCart || deleteCart.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Please select books to remove',

        })
    }

    try {
        const user = await User.findById({ _id: userId });
        let cartUser = user.cart;
        // let newCart = [];
        deleteCart.map(deleteBookId => {
            cartUser = cartUser.filter(userBook => userBook.bookId !== deleteBookId)
        })
        console.log('cartUser', cartUser);

        user.cart = cartUser;
        console.log('newCart', cartUser);
        await User.findByIdAndUpdate({ _id: userId }, user);
        res.json({
            success: true,
            message: "Books are added",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error")
    }
})

// @route: PUT api/carts
// @Desc: change amount book to cart by id
// @access: User
router.put('/change', verifyUserToken, async (req, res) => {
    const { userId, changeCart } = req.body;
    // console.log('userId-deleteCart', userId, changeCart);
    if (!changeCart || changeCart.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Please select books to remove',

        })
    }

    try {
        const user = await User.findById({ _id: userId });
        let cartUser = user.cart;
        changeCart.map(changeBook => {
            cartUser = cartUser.filter(userBook => userBook.bookId !== changeBook.bookId)
            cartUser = [...cartUser, changeBook]
        })

        // console.log(cartUser);
        user.cart = cartUser;
        // console.log('newCart', cartUser);
        await User.findByIdAndUpdate({ _id: userId }, user);
        res.json({
            success: true,
            message: "Books are changed",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error")
    }
})



module.exports = router;
