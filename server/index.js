const express = require('express');
const mongoose = require('mongoose');
const userAuthRouter = require('./routes/userAuth');
const adminAuthRouter = require('./routes/adminAuth');
const bookRouter = require('./routes/book');
const cartRouter = require('./routes/cart');
const tagRouter = require('./routes/tag');
const bannerRouter = require('./routes/banner');
const uploadRouter = require('./routes/upload');

const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@reddit-project.bcqvv.mongodb.net/fahasa?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useCreateIndex: true,
                autoIndex: true,
            });

        console.log('connect DB success');
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}


connectDB();
const app = express();
app.use(cors());
app.use(express.json())
app.use(cookieParser())

// app.get('/', (req, res, next) => res.send('Hello ae'));
app.use('/api/users/auth', userAuthRouter)
app.use('/api/admins/auth', adminAuthRouter)
app.use('/api/books', bookRouter)
app.use('/api/carts', cartRouter)
app.use('/api/tags', tagRouter)
app.use('/api/banners', bannerRouter)
app.use('/api/upload', uploadRouter)


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server started on port http://localhost:${PORT}`));