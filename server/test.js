const Tag = require('./models/Tag');
const mongoose = require('mongoose');
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

const test = async () => {
    const tags = ['romance', 'comics & graphic novels', 'historical fiction', 'horror', 'literature fiction', 'manga', 'mystery thrillers & crime', 'poetry', 'science fiction', 'fantasy'];

    tags.map(async tag => {
        const tagObj = new Tag({
            tagName: tag
        })
        await tagObj.save();
    })

}

test()