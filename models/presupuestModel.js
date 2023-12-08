const { Schema, model } = require("mongoose");

const PresupuestSchema = Schema({
    consultation: {
        type: Schema.ObjectId,
        ref: "Consultation"
    },
    treatment: {
        type: Schema.ObjectId,
        ref: "Treatment"
    },
    quantity: {
        type: Number,
        required: true
    },
    unitCost: {
        type: Number,
        required: true
    },
    problemFound: {
        type: String,
        required: true
    },
    initialCost: {
        type: Number
    },
    discount: {
        type: Number,
        required: true
    },
    finalCost: {
        type: Number
    }
});

module.exports = model("Presupuest", PresupuestSchema, "presupuests");