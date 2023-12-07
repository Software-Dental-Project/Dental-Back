const TreatmentDetail = require("../models/treatmentDetailModel");
const Campus = require("../models/campusModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const create = async (req, res) => {
    let body = req.body;
    let consultationId = req.query.idConsultation;
    let patientId = req.query.idPatient;
    let treatmentId = req.query.idTreatment;

    if (!body.description || !body.initialCost) {
        return res.status(400).json({
            "status": "error",
            "message": "Missing data"
        });
    }

    let bodyTreatmentDetail = {
        consultation: consultationId,
        description: body.description,
        initialCost: body.initialCost,
        finalCost: body.initialCost,
        patient: patientId,
        treatment: treatmentId,
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

        const populatedTreatmentDetail = await TreatmentDetail.findById(treatmentDetailStored._id).populate([{ path: "consultation", populate: { path: "campus", populate: { path: "clinic", select: 'user -_id' }, select: 'name clinic user -_id' }, select: 'campus' }, { path: "patient", populate: { path: "personData", select: 'names fatherLastName motherLastName' }, select: 'personData' }, { path: 'treatment', select: 'name -_id'}]).select('-__v');

        return res.status(200).json({
            "status": "success",
            "message": "Treatment detail registered",
            "treatmentDetail": populatedTreatmentDetail
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
    TreatmentDetail.find().populate("consultation").sort('startDate').then(treatmentDetails => {
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
    TreatmentDetail.findById(req.query.idTreatmentDetail).populate([ { path: "patient", populate: { path: "personData" } } , { path: "consultation" } ] ).then(treatmentDetail => {
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

const getByConsultationId = (req, res) => {
    let consultationId = req.query.idConsultation;

    TreatmentDetail.find({ consultation: consultationId }).sort('startDate').then(treatmentDetails => {
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

    TreatmentDetail.find().populate([{ path: "consultation", populate: [{ path: "campus", populate: { path: "user", match: { _id: userId } } }, {path: "doctor", populate: { path: "personData"}}] }, {path: "patient", populate: { path: "personData"}} ]).then(treatmentDetails => {
        treatmentDetails = treatmentDetails.filter(treatmentDetail => treatmentDetail.consultation.campus.user);
        
        if (treatmentDetails.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "Tratamientos no encontrados"
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

const myTreatmentDetailsClinicByCampus = async (req, res) => {
    let userId = new ObjectId(req.user.id);
    let clinicId;

    try {
        const campus = await Campus.findOne({ user: userId });
      
        if (!campus) {
          return res.status(404).json({
            status: "Error",
            message: "No campus available..."
          });
        }
      
        clinicId = campus.clinic;
      
    } catch (error) {
        return res.status(500).json({
          status: "error",
          error
        });
    }

    TreatmentDetail.find().populate([{ path: "consultation", populate: { path: "campus", populate: { path: 'clinic', match: { _id: clinicId }, select: 'user -_id' }, select: 'name clinic user -_id' }, select: 'campus' }, {path: "patient", populate: { path: "personData", select: 'names fatherLastName motherLastName'}, select: 'personData'}, { path: 'treatment', select: 'name -_id'}]).select('-__v').then(treatmentDetails => {
        treatmentDetails = treatmentDetails.filter(treatmentDetail => treatmentDetail.consultation.campus.clinic);
        
        if (treatmentDetails.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "Tratamientos no encontrados"
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

const editTreatmentDetail = (req, res) => {
    let id = req.query.idTreatmentDetail;

    TreatmentDetail.findOneAndUpdate({ _id: id }, req.body, { new: true }).then(async treatmentDetailUpdated => {
        if (!treatmentDetailUpdated) {
            return res.status(404).json({
                status: "error",
                mensaje: "Treatment Detail not found"
            });
        }

        const populatedTreatmentDetail = await TreatmentDetail.findById(treatmentDetailUpdated._id).populate([{ path: "consultation", populate: { path: "campus", populate: { path: "clinic", select: 'user -_id' }, select: 'name clinic user -_id' }, select: 'campus' }, {path: "patient", populate: { path: "personData", select: 'names fatherLastName motherLastName' }, select: 'personData'}, { path: 'treatment', select: 'name -_id'}]).select('-__v');

        return res.status(200).send({
            status: "success",
            treatmentDetail: populatedTreatmentDetail
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
    getByConsultationId,
    myTreatmentDetailsByCampus,
    myTreatmentDetailsClinicByCampus,
    editTreatmentDetail
}