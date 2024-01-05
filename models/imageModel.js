const { Schema, model } = require("mongoose");

const ImageSchema = Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    consultation: {
        type: Schema.ObjectId,
        ref: "Consultation"
    }
});

module.exports = model("Image", ImageSchema, "images");