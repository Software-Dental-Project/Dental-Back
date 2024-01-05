const Image = require("../models/imageModel");
const Campus = require("../models/campusModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const cloudinary = require('cloudinary');
const fs = require("fs");

const create = async (req, res) => {
    let body = req.body;
    let consultationId = req.query.idConsultation;

    if (!body.name || !body.date || !body.description) {
        return res.status(400).json({
            "status": "error",
            "message": "Faltan datos"
        });
    }

    let bodyImage = {
        consultation: consultationId,
        name: body.name,
        date: body.date,
        description: body.description,
        image: body.image
    }

    let image_to_save = new Image(bodyImage);

    try {
        const imageStored = await image_to_save.save();

        if (!imageStored) {
            return res.status(500).json({
                "status": "error",
                "message": "No image saved"
            });
        }

        const populatedImage = await Image.findById(imageStored._id).populate({ path: "consultation", populate: { path: "campus", populate: {path: 'clinic', select: '_id' }, select: 'clinic' }, select: 'campus' }).select('-__v');

        return res.status(200).json({
            "status": "success",
            "message": "Image registered",
            "image": populatedImage
        });
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "message": "Error while saving image",
            error
        });
    }
}

const myImagesClinicByCampus = async (req, res) => {
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

    Image.find().populate({ path: "consultation", populate: { path: "campus", populate: {path: 'clinic', match: { _id: clinicId }, select: '_id' }, select: 'clinic' }, select: 'campus' }).select('-__v').then(images => {
        images = images.filter(image => image.consultation.campus.clinic);
        
        if (images.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "Imagenes no encontradas"
            });
        }

        return res.status(200).json({
            "status": "success",
            images
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const editImage = (req, res) => {
    let id = req.query.idImage;

    Image.findOneAndUpdate({ _id: id }, req.body, { new: true }).then(async imageUpdated => {
        if (!imageUpdated) {
            return res.status(404).json({
                status: "error",
                mensaje: "Image not found"
            });
        }

        const populatedImage = await Image.findById(imageUpdated._id).populate({ path: "consultation", populate: { path: "campus", populate: {path: 'clinic', select: '_id' }, select: 'clinic' }, select: 'campus' }).select('-__v');

        return res.status(200).send({
            status: "success",
            image: populatedImage
        });
    }).catch(() => {
        return res.status(404).json({
            status: "error",
            mensaje: "Error while finding and updating image"
        });
    });
}

const uploadImage = async (req, res) => {
    try {
        const response = await cloudinary.v2.uploader.upload(req.file.path, { public_id: req.body.id });

        fs.unlinkSync(req.file.path);

        Image.findOneAndUpdate({ _id: req.body.id }, { image: response.url }, { new: true }).then(async imageUpdated => {
            if (!imageUpdated) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "Image not found"
                });
            }

            const populatedImage = await Image.findById(imageUpdated._id).populate({ path: "consultation", populate: { path: "campus", populate: {path: 'clinic', select: '_id' }, select: 'clinic' }, select: 'campus' }).select('-__v');

            return res.status(200).send({
                status: "success",
                image: populatedImage
            });
        }).catch(() => {
            return res.status(404).json({
                status: "error",
                mensaje: "Error while finding and updating image"
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
    myImagesClinicByCampus,
    editImage,
    uploadImage
}