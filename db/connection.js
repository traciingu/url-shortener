require('dotenv').config();
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');


module.exports = async(() => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
        console.log("DB connection closing...");
    }
})();