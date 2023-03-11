const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const PORT = 3000;
app.use(express.json());

const Shortlinks = mongoose.model('Shortlinks', new mongoose.Schema(
    { url: String, shortlink: String },
    {
        database: 'Shortlinks',
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }));

router.post('/', async (req, res) => {
    let { url, shortlink } = req.body;

    if (!url) {
        res.status(400).send("URL property does not exist");
    }

    const match = await Shortlinks.find({ shortlink });

    if (match.length === 0) {
        if (!shortlink) {
            shortlink = crypto.createHash('md5').update(url).digest('hex').slice(0, 10);
        }

        res.status(201).json(await new Shortlinks({ url, shortlink }).save());
    } else {
        res.status(200).send("Shortlink already exists");
    }
});


app.use(router);

app.listen(PORT, () => { console.log(`Listening to port ${PORT}`) });