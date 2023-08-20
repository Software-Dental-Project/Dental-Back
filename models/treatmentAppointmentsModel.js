const { Schema, model } = require("mongoose");

const TreatmentAppointmentSchema = Schema({
    treatmentDetail: {
        type: Schema.ObjectId,
        ref: "TreatmentDetail"
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = model("TreatmentAppointment", TreatmentAppointmentSchema, "treatmentAppointments");