const Patient = require("../models/patientModel");
const PersonData = require("../models/personDataModel");
const cloudinary = require('cloudinary');
const fs = require("fs");

const create = async (req, res) => {
    let userId = req.user.id;
    let personDataId = req.query.idPersonData;

    let bodyPatient = {
        personData: personDataId,
        user: userId
    }

    let patient_to_save = new Patient(bodyPatient);

    try {
        const patientStored = await patient_to_save.save();

        if (!patientStored) {
            return res.status(500).json({
                "status": "error",
                "message": "No patient saved"
            });
        }

        return res.status(200).json({
            "status": "success",
            "message": "Patient registered",
            "patient": patientStored
        });
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "message": "Error while saving patient",
            error
        });
    }
}

const createWithoutUser = async (req, res) => {
    let personDataId = req.query.idPersonData;

    let bodyPatient = {
        personData: personDataId
    }

    let patient_to_save = new Patient(bodyPatient);

    try {
        const patientStored = await patient_to_save.save();

        if (!patientStored) {
            return res.status(500).json({
                "status": "error",
                "message": "No patient saved"
            });
        }

        return res.status(200).json({
            "status": "success",
            "message": "Patient registered",
            "patient": patientStored
        });
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "message": "Error while saving patient",
            error
        });
    }
}

const myPatient = (req, res) => {
    let userId = req.user.id;

    Patient.find({ user: userId }).populate("personData").then(patient => {
        if (!patient) {
            return res.status(404).json({
                status: "Error",
                message: "No patient avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            patient
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const list = (req, res) => {
    Patient.find().populate("personData").sort('_id').then(patients => {
        if (!patients) {
            return res.status(404).json({
                status: "Error",
                message: "No patients avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            patients
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const patientById = (req, res) => {
    Patient.findById(req.query.idPatient).populate("personData").then(patient => {
        if (!patient) {
            return res.status(404).json({
                "status": "error",
                "message": "Patient doesn't exist"
            });
        }

        return res.status(200).json({
            "status": "success",
            "patient": patient
        });
    }).catch(() => {
        return res.status(404).json({
            "status": "error",
            "message": "Error while finding patient"
        });
    });
}

const searchPatient = (req, res) => {
    Patient.find().populate({
        path: 'personData',
        match: { names: { $regex: req.query.patientName, $options: 'i' } }
      }).then(patients => {
        if (!patients) {
            return res.status(404).json({
                "status": "error",
                "message": "Patient doesn't exist"
            });
        }

        patients = patients.filter(patient => patient.personData);

        return res.status(200).json({
            "status": "success",
            "patient": patients
        });
    }).catch(() => {
        return res.status(404).json({
            "status": "error",
            "message": "Error while finding patient"
        });
    });
}

const searchPatientByPersonDataId = (req, res) => {
    Patient.find({ personData: req.query.personDataId }).populate('personData').then(patients => {
        patients = patients.filter(patient => patient.personData);

        if (!patients || patients.length == 0) {
            return res.status(404).json({
                "status": "error",
                "message": "Paciente no existe"
            });
        }

        return res.status(200).json({
            "status": "success",
            "patient": patients
        });
    }).catch(() => {
        return res.status(404).json({
            "status": "error",
            "message": "Error while finding patient"
        });
    });
}

const editPatient = (req, res) => {
    let id = req.query.idPatient;

    Patient.findOneAndUpdate({ _id: id }, req.body, { new: true }).then(patientUpdated => {
        if (!patientUpdated) {
            return res.status(404).json({
                status: "error",
                mensaje: "Patient not found"
            });
        }
        return res.status(200).send({
            status: "success",
            patient: patientUpdated
        });
    }).catch(() => {
        return res.status(404).json({
            status: "error",
            mensaje: "Error while finding and updating patient"
        });
    });
}

const uploadImage = async (req, res) => {
    if(!req.file){
        return res.status(400).json({
            "status": "error",
            "message": "Missing image"
        });
    }

    const imageSplit = req.file.originalname.split("\.");
    const extension = imageSplit[imageSplit.length - 1];

    if(extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "PNG" && extension != "JPG" && extension != "JPEG"){
        fs.unlinkSync(req.file.path);

        return res.status(400).json({
            "status": "error",
            "message": "Invalid file extension"
        });
    }

    try {
        const response = await cloudinary.v2.uploader.upload(req.file.path, { public_id: "P-" + req.body.id });

        fs.unlinkSync(req.file.path);

        PersonData.findOneAndUpdate({ _id: req.body.id }, { profilePic: response.url }, { new: true }).then(async personDataUpdated => {
            if (!personDataUpdated) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "Person Data not found"
                });
            }

            const populatedPersonData = await PersonData.findById(personDataUpdated._id).select('-__v');

            return res.status(200).send({
                status: "success",
                personData: populatedPersonData
            });
        }).catch(() => {
            return res.status(404).json({
                status: "error",
                mensaje: "Error while finding and updating person data"
            });
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            error
        });
    }
}

module.exports = {
    create,
    createWithoutUser,
    myPatient,
    list,
    patientById,
    searchPatient,
    searchPatientByPersonDataId,
    editPatient,
    uploadImage
}