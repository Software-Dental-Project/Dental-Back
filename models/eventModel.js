const { Schema, model } = require("mongoose");

const EventSchema = Schema({
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
    reason: {
        type: String,
        default: "No posee motivo"
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Scheduled"
    },
    hour: {
        type: String,
        required: true
    },
    typeEvent: {
        type: String,
        required: true
    },
    eventId: {
        type: String,
        required: true
    },
    treatmentDetail: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        default: 1
    }
});

module.exports = model("Event", EventSchema, "events");