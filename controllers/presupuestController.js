const Presupuest = require("../models/presupuestModel");
const Campus = require("../models/campusModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const create = async (req, res) => {
    let body = req.body;
    let consultationId = req.query.idConsultation;
    let treatmentId = req.query.idTreatment;

    if (!body.quantity || !body.unitCost || body.discount == null) {
        return res.status(400).json({
            "status": "error",
            "message": "Faltan datos"
        });
    }

    let bodyPresupuest = {
        consultation: consultationId,
        treatment: treatmentId,
        quantity: body.quantity,
        unitCost: body.unitCost,
        problemFound: body.problemFound,
        initialCost: body.initialCost,
        discount: body.discount,
        finalCost: body.finalCost
    }

    let presupuest_to_save = new Presupuest(bodyPresupuest);

    try {
        const presupuestStored = await presupuest_to_save.save();

        if (!presupuestStored) {
            return res.status(500).json({
                "status": "error",
                "message": "No presupuest saved"
            });
        }

        const populatedPresupuest = await Presupuest.findById(presupuestStored._id).populate([{ path: "consultation", populate: { path: "campus", populate: { path: 'clinic', select: 'user -_id' }, select: 'name clinic -_id' }, select: 'campus' }, { path: 'treatment', select: 'name -_id'}]).select('-__v');

        return res.status(200).json({
            "status": "success",
            "message": "Presupuest registered",
            "presupuest": populatedPresupuest
        });
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "message": "Error while saving presupuest",
            error
        });
    }
}

const list = (req, res) => {
    Presupuest.find().populate("consultation treatment").sort('_id').then(presupuests => {
        if (!presupuests) {
            return res.status(404).json({
                status: "Error",
                message: "No presupuests avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            presupuests
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const presupuestById = (req, res) => {
    Presupuest.findById(req.query.idPresupuest).then(presupuest => {
        if (!presupuest) {
            return res.status(404).json({
                "status": "error",
                "message": "Presupuest doesn't exist"
            });
        }

        return res.status(200).json({
            "status": "success",
            "presupuest": presupuest
        });
    }).catch(() => {
        return res.status(404).json({
            "status": "error",
            "message": "Error while finding presupuest"
        });
    });
}

const getByConsultationId = (req, res) => {
    let consultationId = req.query.idConsultation;

    Presupuest.find({ consultation: consultationId }).populate(["treatment", { path: "consultation", populate: { path: "patient"} }]).sort('priority').then(presupuests => {
        if (presupuests.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron problemas"
            });
        }

        return res.status(200).json({
            "status": "success",
            presupuests
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const myPresupuestsByCampus = (req, res) => {
    let userId = new ObjectId(req.user.id);

    Presupuest.find().populate([{ path: "consultation", populate: [{ path: "campus", populate: { path: "user", match: { _id: userId } } }, "patient"] }, 'treatment']).sort('hour').then(presupuests => {
        presupuests = presupuests.filter(presupuest => presupuest.consultation.campus.user);
        
        if (presupuests.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "Presupuestos no encontrados"
            });
        }

        return res.status(200).json({
            "status": "success",
            presupuests
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const myPresupuestsClinicByCampus = async (req, res) => {
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

    Presupuest.find().populate([{ path: "consultation", populate: { path: "campus", populate: { path: 'clinic', match: { _id: clinicId }, select: 'user -_id' }, select: 'name clinic -_id' }, select: 'campus' }, { path: 'treatment', select: 'name -_id'}]).select('-__v').then(presupuests => {
        presupuests = presupuests.filter(presupuest => presupuest.consultation.campus.clinic);
        
        if (presupuests.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "Problemas no encontrados"
            });
        }

        return res.status(200).json({
            "status": "success",
            presupuests
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const editPresupuest = (req, res) => {
    let id = req.query.idPresupuest;

    Presupuest.findOneAndUpdate({ _id: id }, req.body, { new: true }).then(async presupuestUpdated => {
        if (!presupuestUpdated) {
            return res.status(404).json({
                status: "error",
                mensaje: "Presupuest not found"
            });
        }

        const populatedPresupuest = await Presupuest.findById(presupuestUpdated._id).populate([{ path: "consultation", populate: { path: "campus", populate: { path: 'clinic', select: 'user -_id' }, select: 'name clinic -_id' }, select: 'campus' }, { path: 'treatment', select: 'name -_id'}]).select('-__v');
        
        return res.status(200).send({
            status: "success",
            presupuest: populatedPresupuest
        });
    }).catch(() => {
        return res.status(404).json({
            status: "error",
            mensaje: "Error while finding and updating presupuest"
        });
    });
}

const deleteById = async (req, res) => {
    let presupuestId = req.query.idPresupuest;

    Presupuest.findOneAndDelete({ "_id": presupuestId }).then(presupuestDeleted => {
        if (!presupuestDeleted) {
            return res.status(500).json({
                "status": "error",
                "message": "No presupuest found"
            });
        }
        return res.status(200).json({
            "status": "success",
            "message": "Presupuesto eliminado satisfactoriamente"
        });
    }).catch(() => {
        return res.status(500).json({
            "status": "error",
            "message": "Error while deleting presupuest"
        });
    });
}

module.exports = {
    create,
    list,
    presupuestById,
    getByConsultationId,
    myPresupuestsByCampus,
    myPresupuestsClinicByCampus,
    editPresupuest,
    deleteById
}