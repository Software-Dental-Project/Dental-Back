const TreatmentAppointment = require("../models/treatmentAppointmentsModel");

const create = async (req, res) => {
    let body = req.body;
    let treatmentDetailId = req.query.idTreatmentDetail;

    if (!body.description || !body.date) {
        return res.status(400).json({
            "status": "error",
            "message": "Missing data"
        });
    }

    let bodyTreatmentAppointment = {
        treatmentDetail: treatmentDetailId,
        description: body.description,
        date: body.date
    }

    let treatment_appointment_to_save = new TreatmentAppointment(bodyTreatmentAppointment);

    try {
        const treatmentAppointmentStored = await treatment_appointment_to_save.save();

        if (!treatmentAppointmentStored) {
            return res.status(500).json({
                "status": "error",
                "message": "No treatmentAppointment saved"
            });
        }

        return res.status(200).json({
            "status": "success",
            "message": "Treatment appointment registered",
            "treatmentAppointment": treatmentAppointmentStored
        });
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "message": "Error while saving treatment appointment",
            error
        });
    }
}

const list = (req, res) => {
    TreatmentAppointment.find().populate("treatmentDetails").sort('_id').then(treatmentAppointments => {
        if (!treatmentAppointments) {
            return res.status(404).json({
                status: "Error",
                message: "No treatmentAppointments avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            treatmentAppointments
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const treatmentAppointmentById = (req, res) => {
    TreatmentAppointment.findById(req.query.idTreatmentAppointments).then(treatmentAppointment => {
        if (!treatmentAppointment) {
            return res.status(404).json({
                "status": "error",
                "message": "Treatment appointment doesn't exist"
            });
        }

        return res.status(200).json({
            "status": "success",
            "treatmentAppointment": treatmentAppointment
        });
    }).catch(() => {
        return res.status(404).json({
            "status": "error",
            "message": "Error while finding treatmentAppointment"
        });
    });
}

const getByTreatmentDetailId = (req, res) => {
    let treatmentDetailId = req.query.idTreatmentDetail;

    TreatmentAppointment.find({ treatmentDetail: treatmentDetailId }).sort('_id').then(treatmentAppointments => {
        if (!treatmentAppointments) {
            return res.status(404).json({
                status: "Error",
                message: "No treatmentAppointments avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            treatmentAppointments
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

module.exports = {
    create,
    list,
    treatmentAppointmentById,
    getByTreatmentDetailId
}