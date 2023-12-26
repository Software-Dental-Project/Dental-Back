const { Schema, model } = require("mongoose");

const TreatmentDetailSchema = Schema({
    consultation: {
        type: Schema.ObjectId,
        ref: "Consultation"
    },
    description: {
        type: String,
        default: "No posee motivo"
    },
    initialCost: {
        type: Number,
        default: 0.0
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    patient: {
        type: Schema.ObjectId,
        ref: "Patient"
    },
    status: {
        type: String,
        default: "En curso"
    },
    treatment: {
        type: Schema.ObjectId,
        ref: "Treatment"
    },
    presupuested: {
        type: Number,
        default: 0.0
    }
});

module.exports = model("TreatmentDetail", TreatmentDetailSchema, "treatmentDetails");