const { Schema, model } = require("mongoose");

const PersonDataSchema = Schema({
    age: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    bornDate: {
        type: String,
        required: true
    },
    names: {
        type: String,
        required: true
    },
    lastNames: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
    //pendiente poner: Imagen
});

module.exports = model("PersonData", PersonDataSchema, "peopleData");