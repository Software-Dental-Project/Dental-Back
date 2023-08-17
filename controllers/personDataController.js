const PersonData = require("../models/personDataModel");

const create = async (req, res) => {
    let body = req.body;

    if (!body.country || !body.dni || !body.genre || !body.bornDate || !body.names
        || !body.lastNames || !body.phoneNumber || !body.address || !body.email) {
        return res.status(400).json({
            "status": "error",
            "message": "Missing data"
        });
    }

    let bodyPersonData = {
        country: body.country,
        dni: body.dni,
        genre: body.genre,
        bornDate: body.bornDate,
        names: body.names,
        lastNames: body.lastNames,
        phoneNumber: body.phoneNumber,
        address: body.address,
        email: body.email
    }

    try {
        const people = await PersonData.find({ $or: [{ dni: bodyPersonData.dni.toLowerCase() }] });

        if (people && people.length >= 1) {
            return res.status(200).json({
                "status": "success",
                "message": "The person already exists"
            });
        }

        let person_data_to_save = new PersonData(bodyPersonData);

        try {
            const personStored = await person_data_to_save.save();

            if (!personStored) {
                return res.status(500).json({
                    "status": "error",
                    "message": "No person saved"
                });
            }

            return res.status(200).json({
                "status": "success",
                "message": "Person registered",
                "personData": personStored
            });
        } catch (error) {
            return res.status(500).json({
                "status": "error",
                "message": "Error while saving person",
                error
            });
        }
    } catch {
        return res.status(500).json({
            "status": "error",
            "message": "Error while finding person data duplicate"
        });
    }
}

const list = (req, res) => {
    PersonData.find().sort('_id').then(peopleData => {
        if (!peopleData) {
            return res.status(404).json({
                status: "Error",
                message: "No people data avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            peopleData
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const personById = (req, res) => {
    PersonData.findById(req.query.idPerson).then(person => {
        if (!person) {
            return res.status(404).json({
                "status": "error",
                "message": "Person Data doesn't exist"
            });
        }

        return res.status(200).json({
            "status": "success",
            "person": person
        });
    }).catch(() => {
        return res.status(404).json({
            "status": "error",
            "message": "Error while finding person Data"
        });
    });
}

const editPerson = (req, res) => {
    let id = req.query.idPerson;

    PersonData.findOneAndUpdate({ _id: id }, req.body, { new: true }).then(personDataUpdated => {
        if (!personDataUpdated) {
            return res.status(404).json({
                status: "error",
                mensaje: "Person Data not found"
            });
        }
        return res.status(200).send({
            status: "success",
            personData: personDataUpdated
        });
    }).catch(() => {
        return res.status(404).json({
            status: "error",
            mensaje: "Error while finding and updating person data"
        });
    });
}

module.exports = {
    create,
    list,
    personById,
    editPerson
}