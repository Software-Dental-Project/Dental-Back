const {Schema, model} = require("mongoose");

const DoctorSchema = Schema({
    personData: {
        type: Schema.ObjectId,
        ref: "PersonData"
    },
    tuitionNumber: {
        type: String,
        required: true
    },
    speciality: {
        type: Schema.ObjectId,
        ref: "Speciality"
    }
});

module.exports = model("Doctor", DoctorSchema, "doctors");