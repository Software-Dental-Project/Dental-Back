const {Schema, model} = require("mongoose");

const  CampusDoctorSchema = Schema({
    campus: {
        type: Schema.ObjectId,
        ref: "Campus"
    },
    doctor: {
        type: Schema.ObjectId,
        ref: "Doctor"
    },
    startDate: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});

module.exports = model("CampusDoctor", CampusDoctorSchema, "campus-doctors");