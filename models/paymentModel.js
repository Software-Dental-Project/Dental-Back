const { Schema, model } = require("mongoose");

const PaymentSchema = Schema({
    total: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    campus: {
        type: Schema.ObjectId,
        ref: "Campus"
    },
    //Ingreso
    consultation: {
        type: String
    },
    quantity: {
        type: Number
    },
    comission: {
        type: Number
    },
    image: {
        type: String
    },
    //Egreso
    reason: {
        type: String
    },
});

module.exports = model("Payment", PaymentSchema, "payments");