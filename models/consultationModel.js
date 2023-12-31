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
        default: "No posee motivo"
    },
    cost: {
        type: Number,
        default: 0.0
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
    },
    duration: {
        type: Number,
        default: 1
    },
    discount: {
        type: Number,
        default: 0.0
    }
});

module.exports = model("Consultation", ConsultationSchema, "consultations");