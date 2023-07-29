const {Schema, model} = require("mongoose");

const ClinicSchema = Schema({
    ruc: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    startDate: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
    //pendiente poner: Imagen y Dni de director (id de DatosPersona)
});

module.exports = model("Clinic", ClinicSchema, "clinics");