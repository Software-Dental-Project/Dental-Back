const { Schema, model } = require("mongoose");

const TreatmentDetailSchema = Schema({
    consultation: {
        type: Schema.ObjectId,
        ref: "Consultation"
    },
    description: {
        type: String,
        required: true
    },
    initialCost: {
        type: String,
        required: true
    },
    finalCost: {
        type: String,
        required: true
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
        default: "Incompleto"
    },
    treatment: {
        type: Schema.ObjectId,
        ref: "Treatment"
    },
});

module.exports = model("TreatmentDetail", TreatmentDetailSchema, "treatmentDetails");