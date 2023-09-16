const { Schema, model } = require("mongoose");

const ConsultationSchema = Schema({
    patient: {
        type: Schema.ObjectId,
        ref: "Patient"
    },
    doctor: {
        type: Schema.ObjectId,
        ref: "Doctor"
    },
    campus: {
        type: Schema.ObjectId,
        ref: "Campus"
    },
    consultationReason: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    }
});

module.exports = model("Consultation", ConsultationSchema, "consultations");