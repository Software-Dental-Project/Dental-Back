const TreatmentDetail = require("../models/treatmentDetailModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const create = async (req, res) => {
    let body = req.body;
    let consultationResultId = req.query.idConsultationResult;
    let patientId = req.query.idPatient;

    if (!body.description || !body.initialCost || !body.finalCost || !body.endDate) {
        return res.status(400).json({
            "status": "error",
            "message": "Missing data"
        });
    }

    let bodyTreatmentDetail = {
        consultationResult: consultationResultId,
        description: body.description,
        initialCost: body.initialCost,
        finalCost: body.finalCost,
        startDate: body.startDate,
        endDate: body.endDate,
        patient: patientId
    }

    let treatment_detail_to_save = new TreatmentDetail(bodyTreatmentDetail);

    try {
        const treatmentDetailStored = await treatment_detail_to_save.save();

        if (!treatmentDetailStored) {
            return res.status(500).json({
                "status": "error",
                "message": "No treatment detail saved"
            });
        }

        return res.status(200).json({
            "status": "success",
            "message": "Treatment detail registered",
            "treatmentDetail": treatmentDetailStored
        });
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "message": "Error while saving treatmentDetail",
            error
        });
    }
}

const list = (req, res) => {
    TreatmentDetail.find().populate("consultationResult").sort('startDate').then(treatmentDetails => {
        if (!treatmentDetails) {
            return res.status(404).json({
                status: "Error",
                message: "No treatmentDetails avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            treatmentDetails
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const treatmentDetailById = (req, res) => {
    TreatmentDetail.findById(req.query.idTreatmentDetail).then(treatmentDetail => {
        if (!treatmentDetail) {
            return res.status(404).json({
                "status": "error",
                "message": "Treatment detail doesn't exist"
            });
        }

        return res.status(200).json({
            "status": "success",
            "treatmentDetail": treatmentDetail
        });
    }).catch(() => {
        return res.status(404).json({
            "status": "error",
            "message": "Error while finding treatmentDetail"
        });
    });
}

const getByConsultationResultId = (req, res) => {
    let consultationResultId = req.query.idConsultationResult;

    TreatmentDetail.find({ consultationResult: consultationResultId }).sort('startDate').then(treatmentDetails => {
        if (!treatmentDetails) {
            return res.status(404).json({
                status: "Error",
                message: "No treatmentDetails avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            treatmentDetails
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const myTreatmentDetailsByCampus = async (req, res) => {
    let userId = new ObjectId(req.user.id);

    TreatmentDetail.find().populate([{ path: "consultationResult", populate: { path: "consultation", populate: [{ path: "campus", populate: { path: "user", match: { _id: userId } } }, {path: "doctor", populate: { path: "personData"}}] } }, {path: "patient", populate: { path: "personData"}} ]).then(treatmentDetails => {
        if (!treatmentDetails) {
            return res.status(404).json({
                status: "Error",
                message: "No treatmentDetails avaliable..."
            });
        }

        treatmentDetails = treatmentDetails.filter(treatmentDetail => treatmentDetail.consultationResult.consultation.campus.user);

        return res.status(200).json({
            "status": "success",
            treatmentDetails
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const editTreatmentDetail = (req, res) => {
    let id = req.query.idTreatmentDetail;

    TreatmentDetail.findOneAndUpdate({ _id: id }, req.body, { new: true }).then(treatmentDetailUpdated => {
        if (!treatmentDetailUpdated) {
            return res.status(404).json({
                status: "error",
                mensaje: "Treatment Detail not found"
            });
        }
        return res.status(200).send({
            status: "success",
            treatmentDetail: treatmentDetailUpdated
        });
    }).catch(() => {
        return res.status(404).json({
            status: "error",
            mensaje: "Error while finding and updating treatment detail"
        });
    });
}

module.exports = {
    create,
    list,
    treatmentDetailById,
    getByConsultationResultId,
    myTreatmentDetailsByCampus,
    editTreatmentDetail
}