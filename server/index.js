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


app.use(router);

app.listen(PORT, () => { console.log(`Listening to port ${PORT}`) });