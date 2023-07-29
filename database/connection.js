const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/dental_back");
        console.log("Connected to dental database");
    } catch (error) {
        console.log(error);
        throw new Error("Could not connect to the database");
    }
}

module.exports = {
    connection
}