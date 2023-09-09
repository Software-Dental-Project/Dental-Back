const CampusesPatients = require("../models/campusesPatientsModel");
const Campus = require("../models/campusModel");

const create = async (req, res) => {
    let body = req.body;
    let patientId = req.query.idPatient;
    let campusId = req.query.idCampus;

    if (!body.startDate || !body.state) {
        return res.status(400).json({
            "status": "error",
            "message": "Missing data"
        });
    }

    let bodyCampusPatient = {
        campus: campusId,
        patient: patientId,
        startDate: body.startDate,
        state: body.state
    }

    try {
        const campusesPatients = await CampusesPatients.find({ $and: [{ campus: bodyCampusPatient.campus.toLowerCase() }, { patient: bodyCampusPatient.patient.toLowerCase() }] });

        if (campusesPatients && campusesPatients.length >= 1) {
            return res.status(200).json({
                "status": "success",
                "message": "The campuses and patients already exists"
            });
        }

        let campusPatient_to_save = new CampusesPatients(bodyCampusPatient);

        try {
            const campusPatientStored = await campusPatient_to_save.save();

            if (!campusPatientStored) {
                return res.status(500).json({
                    "status": "error",
                    "message": "No campus and patient saved"
                });
            }

            return res.status(200).json({
                "status": "success",
                "message": "Campus and patient registered",
                "campusPatient": campusPatientStored
            });
        } catch (error) {
            return res.status(500).json({
                "status": "error",
                "message": "Error while saving campus and patient",
                error
            });
        }
    } catch {
        return res.status(500).json({
            "status": "error",
            "message": "Error while finding campus and patient duplicate"
        });
    }
}

const list = (req, res) => {
    CampusesPatients.find().populate([{ path: "patient", populate: { path: "personData" } }, "campus"]).sort('_id').then(campusesPatients => {
        if (!campusesPatients) {
            return res.status(404).json({
                status: "Error",
                message: "No campuses and patients avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            campusesPatients
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const getByCampusId = (req, res) => {
    let campusId = req.query.idCampus;

    CampusesPatients.find({ campus: campusId }).populate({ path: "patient", populate: { path: "personData" } }).sort('_id').then(campusesPatients => {
        if (!campusesPatients) {
            return res.status(404).json({
                status: "Error",
                message: "No campusesPatients avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            campusesPatients
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const getByMyCampus = async (req, res) => {
    let userEmail = req.user.email;

    CampusesPatients.find().populate([{ path: "patient", populate: { path: "personData" } }, { path: "campus", populate: { path: "user", match: { email: { $regex: userEmail, $options: 'i' } } } }]).sort('_id').then(campusesPatients => {
        if (!campusesPatients) {
            return res.status(404).json({
                status: "Error",
                message: "No campusesPatients avaliable..."
            });
        }

        campusesPatients = campusesPatients.filter(campusPatient => campusPatient.campus.user);

        return res.status(200).json({
            "status": "success",
            campusesPatients
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const searchPatientsByMyCampus = async (req, res) => {
    let userId = req.user.id;
    let campusId;

    try {
        const campus = await Campus.findOne({ user: userId });
      
        if (!campus) {
          return res.status(404).json({
            status: "Error",
            message: "No campus available..."
          });
        }
      
        campusId = campus._id;
      
    } catch (error) {
        return res.status(500).json({
          status: "error",
          error
        });
    }

    CampusesPatients.find({ campus: campusId }).populate({
        path: 'patient',
        populate: {
          path: 'personData',
          match: { names: { $regex: req.query.patientName, $options: 'i' } } 
        }
    }).sort('_id').then(campusesPatients => {
        if (!campusesPatients) {
            return res.status(404).json({
                status: "Error",
                message: "No campusesPatients avaliable..."
            });
        }

        campusesPatients = campusesPatients.filter(campusPatient => campusPatient.patient.personData);

        return res.status(200).json({
            "status": "success",
            campusesPatients
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const getByPatientId = (req, res) => {
    let patientId = req.query.idPatient;

    CampusesPatients.find({ patient: patientId }).populate("campus").sort('_id').then(campusesPatients => {
        if (!campusesPatients) {
            return res.status(404).json({
                status: "Error",
                message: "No campusesPatients avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            campusesPatients
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
    getByCampusId,
    getByMyCampus,
    searchPatientsByMyCampus,
    getByPatientId
}