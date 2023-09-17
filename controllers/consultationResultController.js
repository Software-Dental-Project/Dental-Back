const ConsultationResult = require("../models/consultationResultModel");

const create = async (req, res) => {
    let body = req.body;
    let consultationId = req.query.idConsultation;
    let treatmentId = req.query.idTreatment;

    if (!body.problemFound || !body.priority || !body.initialCost || !body.discount || !body.finalCost) {
        return res.status(400).json({
            "status": "error",
            "message": "Faltan datos"
        });
    }

    let bodyConsultationResult = {
        problemFound: body.problemFound,
        consultation: consultationId,
        priority: body.priority,
        treatment: treatmentId,
        initialCost: body.initialCost,
        discount: body.discount,
        finalCost: body.finalCost,
        discountValid: true
    }

    try {
        const consultationResults = await ConsultationResult.find({ $and: [{ consultation: consultationId.toLowerCase() }, { treatment: treatmentId.toLowerCase() }] });

        if (consultationResults && consultationResults.length >= 1) {
            return res.status(200).json({
                "status": "success",
                "message": "The consultation result already exists"
            });
        }

        let consultation_result_to_save = new ConsultationResult(bodyConsultationResult);

        try {
            const consultationResultStored = await consultation_result_to_save.save();

            if (!consultationResultStored) {
                return res.status(500).json({
                    "status": "error",
                    "message": "No consultationResult saved"
                });
            }

            return res.status(200).json({
                "status": "success",
                "message": "Consultation result registered",
                "consultationResult": consultationResultStored
            });
        } catch (error) {
            return res.status(500).json({
                "status": "error",
                "message": "Error while saving consultation result",
                error
            });
        }
    } catch {
        return res.status(500).json({
            "status": "error",
            "message": "Error while finding consultation result duplicate"
        });
    }
}

const list = (req, res) => {
    ConsultationResult.find().populate("consultation treatment").sort('_id').then(consultationResults => {
        if (!consultationResults) {
            return res.status(404).json({
                status: "Error",
                message: "No consultationResults avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            consultationResults
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const consultationResultById = (req, res) => {
    ConsultationResult.findById(req.query.idConsultationResult).then(consultationResult => {
        if (!consultationResult) {
            return res.status(404).json({
                "status": "error",
                "message": "Consultation Result doesn't exist"
            });
        }

        return res.status(200).json({
            "status": "success",
            "consultationResult": consultationResult
        });
    }).catch(() => {
        return res.status(404).json({
            "status": "error",
            "message": "Error while finding consultationResult"
        });
    });
}

const getByConsultationId = (req, res) => {
    let consultationId = req.query.idConsultationResult;

    ConsultationResult.find({ consultation: consultationId }).populate(["treatment", { path: "consultation", populate: { path: "patient"} }]).sort('priority').then(consultationResults => {
        if (consultationResults.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron problemas"
            });
        }

        return res.status(200).json({
            "status": "success",
            consultationResults
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const editConsultationResult = (req, res) => {
    let id = req.query.idConsultationResult;

    ConsultationResult.findOneAndUpdate({ _id: id }, req.body, { new: true }).then(consultationResultUpdated => {
        if (!consultationResultUpdated) {
            return res.status(404).json({
                status: "error",
                mensaje: "Consultation result not found"
            });
        }
        return res.status(200).send({
            status: "success",
            consultationResult: consultationResultUpdated
        });
    }).catch(() => {
        return res.status(404).json({
            status: "error",
            mensaje: "Error while finding and updating consultationResult"
        });
    });
}

module.exports = {
    create,
    list,
    consultationResultById,
    getByConsultationId,
    editConsultationResult
}