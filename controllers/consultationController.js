const Consultation = require("../models/consultationModel");

const create = async (req, res) => {
    let body = req.body;
    let doctorId = req.user.id;
    let patientId = req.query.idPatient;
    let campusId = req.query.idCampus;

    if (!body.consultationReason || !body.cost || !body.date) {
        return res.status(400).json({
            "status": "error",
            "message": "Missing data"
        });
    }

    let bodyConsultation = {
        patient: patientId,
        doctor: doctorId,
        campus: campusId,
        consultationReason: body.consultationReason,
        cost: body.cost,
        date: body.date
    }

    let consultation_to_save = new Consultation(bodyConsultation);

    try {
        const consultationStored = await consultation_to_save.save();

        if (!consultationStored) {
            return res.status(500).json({
                "status": "error",
                "message": "No consultation saved"
            });
        }

        return res.status(200).json({
            "status": "success",
            "message": "Consultation registered",
            "consultation": consultationStored
        });
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "message": "Error while saving consultation",
            error
        });
    }
}

const list = (req, res) => {
    Consultation.find().populate("patient doctor campus").sort('_id').then(consultations => {
        if (!consultations) {
            return res.status(404).json({
                status: "Error",
                message: "No consultations avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            consultations
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const consultationById = (req, res) => {
    Consultation.findById(req.query.idConsultation).then(consultation => {
        if (!consultation) {
            return res.status(404).json({
                "status": "error",
                "message": "Consultation doesn't exist"
            });
        }

        return res.status(200).json({
            "status": "success",
            "consultation": consultation
        });
    }).catch(() => {
        return res.status(404).json({
            "status": "error",
            "message": "Error while finding consultation"
        });
    });
}

const myConsultationByPatient = (req, res) => {
    let userId = req.user.id;

    Consultation.find({ patient: userId }).then(consultation => {
        if (!consultation) {
            return res.status(404).json({
                status: "Error",
                message: "No consultation avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            consultation
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const myConsultationByDoctor = (req, res) => {
    let userId = req.user.id;

    Consultation.find({ doctor: userId }).then(consultation => {
        if (!consultation) {
            return res.status(404).json({
                status: "Error",
                message: "No consultation avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            consultation
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const myConsultationByCampus = (req, res) => {
    let userId = req.user.id;

    Consultation.find({ campus: userId }).then(consultation => {
        if (!consultation) {
            return res.status(404).json({
                status: "Error",
                message: "No consultation avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            consultation
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
    consultationById,
    myConsultationByPatient,
    myConsultationByDoctor,
    myConsultationByCampus
}