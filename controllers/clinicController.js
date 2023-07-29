const Clinic = require("../models/clinicModel");

const create = async(req, res) => {
    let body = req.body;
    let userId = req.user.id;

    if(!body.ruc || !body.name || !body.description || !body.startDate || !body.phoneNumber){
        return res.status(400).json({
            "status": "error",
            "message": "Missing data"
        });
    } 

    let bodyClinic = {
        ruc: body.ruc,
        name: body.name,
        description: body.description,
        user: userId,
        startDate: body.startDate,
        phoneNumber: body.phoneNumber,
    }

    try {
        const clinics = await Clinic.find({$or: [{ruc: bodyClinic.ruc.toLowerCase()}]});

        if (clinics && clinics.length >= 1){
            return res.status(200).json({
                "status": "success",
                "message": "The clinic already exists"
            });
        }

        let clinic_to_save = new Clinic(bodyClinic);

        try {
            const clinicStored = await clinic_to_save.save();

            if(!clinicStored){
                return res.status(500).json({
                    "status": "error",
                    "message": "No clinic found"
                });
            }

            return res.status(200).json({
                "status": "success",
                "message": "Clinic registered",
                "clinic": clinicStored
            });
        } catch (error){
            return res.status(500).json({
                "status": "error",
                "message": "Error while saving clinic",
                error
            });
        }
    } catch {
        return res.status(500).json({
            "status": "error",
            "message": "Error while finding clinic"
        });
    }
}

const myClinic = (req, res) => {
    let userId = req.user.id;

    Clinic.find({user: userId}).then( clinic => {
        if(!clinic) {
            return res.status(404).json({
                status: "Error",
                message: "No clinic avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            clinic
        });
    }).catch( () => {
        return res.status(500).json({
            "status": "error",
            "message": "Error while searching tha clinic"
        });
    });
}

module.exports = {
    create,
    myClinic
}