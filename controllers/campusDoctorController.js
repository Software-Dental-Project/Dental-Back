const CampusesDoctors = require("../models/campusesDoctorsModel");

const create = async (req, res) => {
    let body = req.body;
    let doctorId = req.query.idDoctor;
    let campusId = req.query.idCampus;

    if (!body.startDate || !body.state) {
        return res.status(400).json({
            "status": "error",
            "message": "Missing data"
        });
    }

    let bodyCampusDoctor = {
        campus: campusId,
        doctor: doctorId,
        startDate: body.startDate,
        state: body.state
    }

    try {
        const campusesDoctors = await CampusesDoctors.find({ $and: [{ campus: bodyCampusDoctor.campus.toLowerCase() }, { doctor: bodyCampusDoctor.doctor.toLowerCase() }] });

        if (campusesDoctors && campusesDoctors.length >= 1) {
            return res.status(200).json({
                "status": "success",
                "message": "The campuses and doctors already exists"
            });
        }

        let campusDoctor_to_save = new CampusesDoctors(bodyCampusDoctor);

        try {
            const campusDoctorStored = await campusDoctor_to_save.save();

            if (!campusDoctorStored) {
                return res.status(500).json({
                    "status": "error",
                    "message": "No campus and doctor saved"
                });
            }

            return res.status(200).json({
                "status": "success",
                "message": "Campus and doctor registered",
                "campusDoctor": campusDoctorStored
            });
        } catch (error) {
            return res.status(500).json({
                "status": "error",
                "message": "Error while saving campus and doctor",
                error
            });
        }
    } catch {
        return res.status(500).json({
            "status": "error",
            "message": "Error while finding campus and doctor"
        });
    }
}

const list = (req, res) => {
    CampusesDoctors.find().populate([{ path: "doctor", populate: { path: "personData" } }, "campus"]).sort('_id').then(campusesDoctors => {
        if (!campusesDoctors) {
            return res.status(404).json({
                status: "Error",
                message: "No campuses and doctors avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            campusesDoctors
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

    CampusesDoctors.find({ campus: campusId }).populate({ path: "doctor", populate: { path: "personData" } }).sort('_id').then(campusesDoctors => {
        if (!campusesDoctors) {
            return res.status(404).json({
                status: "Error",
                message: "No campusesDoctors avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            campusesDoctors
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const getByDoctorId = (req, res) => {
    let doctorId = req.query.idDoctor;

    CampusesDoctors.find({ doctor: doctorId }).populate("campus").sort('_id').then(campusesDoctors => {
        if (!campusesDoctors) {
            return res.status(404).json({
                status: "Error",
                message: "No campusesDoctors avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            campusesDoctors
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
    getByDoctorId
}