const { Schema, model } = require("mongoose");

const PersonDataSchema = Schema({
    age: {
        type: String
    },
    dni: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    bornDate: {
        type: String
    },
    names: {
        type: String,
        required: true
    },
    fatherLastName: {
        type: String,
        required: true
    },
    motherLastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    profilePic: {
        type: String,
        default: "http://www.gravatar.com/avatar"
    }
});

module.exports = model("PersonData", PersonDataSchema, "peopleData");