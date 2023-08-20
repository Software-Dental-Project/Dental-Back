const { Schema, model } = require("mongoose");

const TreatmentDetailSchema = Schema({
    consultationResult: {
        type: Schema.ObjectId,
        ref: "ConsultationResult"
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
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    }
});

module.exports = model("TreatmentDetail", TreatmentDetailSchema, "treatmentDetails");