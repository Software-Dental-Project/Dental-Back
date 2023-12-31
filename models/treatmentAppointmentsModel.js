const { Schema, model } = require("mongoose");

const TreatmentAppointmentSchema = Schema({
    treatmentDetail: {
        type: Schema.ObjectId,
        ref: "TreatmentDetail"
    },
    description: {
        type: String,
        default: "No posee descripcion"
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
    cost: {
        type: Number,
        default: 0.0
    },
    doctor: {
        type: Schema.ObjectId,
        ref: "Doctor"
    },
    campus: {
        type: Schema.ObjectId,
        ref: "Campus"
    },
    duration: {
        type: Number,
        default: 1
    }
});

module.exports = model("TreatmentAppointment", TreatmentAppointmentSchema, "treatmentAppointments");