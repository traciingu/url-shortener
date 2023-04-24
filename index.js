const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const PORT = 8080;
app.use(express.json());
app.use(cors());

const Shortlinks = mongoose.model('Shortlinks', new mongoose.Schema(
    { url: String, shortlink: String },
    {
        database: 'Shortlinks',
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })
);

router.get('/', async (req, res) => {
    try {
        const results = await Shortlinks.find({});
        res.send(results);
    } catch (err) {
        console.error(err);
    }
});

router.get('/:shortlink', async (req, res) => {
    try {
        const result = await Shortlinks.find({ shortlink: req.path.slice(1) });
        let url = result[0].url;

        if (url.search("http") === -1) {
            url = "https://" + url;
        }

        res.status(200).redirect(url);
    } catch (err) {
        console.error(err);
    }
});

router.post('/', async (req, res) => {
    let { url, shortlink } = req.body;

    if (!url) {
        res.status(400).send("URL property does not exist");
    } else if (typeof url !== "string") {
        res.status(400).send("URL format not accepted");
    }

    if (!shortlink) {
        shortlink = crypto.createHash('md5').update(url).digest('hex').slice(0, 10);
    }

    const match = await Shortlinks.find({ shortlink });

    if (match.length === 0) {
        if (url.search('https://') === -1) {
            url = "https://" + url;
        }

        try {
            new URL(url);
            url = url.replace('https://', '');
            res.status(201).json(await new Shortlinks({ url, shortlink }).save());
        } catch (err) {
            res.status(400).send(err.name);
        }
    } else {
        res.status(409).send("Shortlink already exists");
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await Shortlinks.findByIdAndUpdate(req.params.id, req.body);
        res.send(result);
    } catch (err) {
        res.status(400).send(err.name);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Shortlinks.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (err) {
        res.status(400).send(err.name);
    }
});

router.get('*', (req, res) => {
    res.send("404 error");
});


app.use(router);
app.listen(PORT, () => { console.log(`Listening to port ${PORT}`) });