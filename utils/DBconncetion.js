const mongoose = require("mongoose");

async function DBconnection(DB_URI) {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Conncted to the database`);
    } catch (error) {
        console.log("failed to connect to db", error)
    }
}

module.exports = DBconnection;