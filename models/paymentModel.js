const { Schema, model } = require("mongoose");

const PaymentSchema = Schema({
    consultation: {
        type: Schema.ObjectId,
        ref: "Consultation"
    },
    quantity: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    comission: {
        type: Number,
        required: true
    },
    total: {
        type: Number
    },
    image: {
        type: String
    }
});

module.exports = model("Payment", PaymentSchema, "payments");