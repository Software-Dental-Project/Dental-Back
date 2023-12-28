const Payment = require("../models/paymentModel");
const Campus = require("../models/campusModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const cloudinary = require('cloudinary');
const fs = require("fs");

const create = async (req, res) => {
    let body = req.body;
    let consultationId = req.query.idConsultation;

    if (!body.quantity || !body.paymentMethod || body.comission == null) {
        return res.status(400).json({
            "status": "error",
            "message": "Faltan datos"
        });
    }

    let bodyPayment = {
        consultation: consultationId,
        quantity: body.quantity,
        paymentMethod: body.paymentMethod,
        comission: body.comission,
        total: body.total
    }

    let payment_to_save = new Payment(bodyPayment);

    try {
        const paymentStored = await payment_to_save.save();

        if (!paymentStored) {
            return res.status(500).json({
                "status": "error",
                "message": "No payment saved"
            });
        }

        const populatedPayment = await Payment.findById(paymentStored._id).populate({ path: "consultation", populate: { path: "campus", populate: {path: 'clinic', select: '_id' }, select: 'clinic' }, select: 'campus' }).select('-__v');

        return res.status(200).json({
            "status": "success",
            "message": "Payment registered",
            "payment": populatedPayment
        });
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "message": "Error while saving payment",
            error
        });
    }
}

const list = (req, res) => {
    Payment.find().populate("consultation").then(payments => {
        if (!payments) {
            return res.status(404).json({
                status: "Error",
                message: "No payments avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            payments
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const myPaymentsClinicByCampus = async (req, res) => {
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

    Payment.find().populate({ path: "consultation", populate: { path: "campus", populate: {path: 'clinic', match: { _id: clinicId }, select: '_id' }, select: 'clinic' }, select: 'campus' }).select('-__v').then(payments => {
        payments = payments.filter(payment => payment.consultation.campus.clinic);
        
        if (payments.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "Pagos no encontrados"
            });
        }

        return res.status(200).json({
            "status": "success",
            payments
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const editPayment = (req, res) => {
    let id = req.query.idPayment;

    Payment.findOneAndUpdate({ _id: id }, req.body, { new: true }).then(async paymentUpdated => {
        if (!paymentUpdated) {
            return res.status(404).json({
                status: "error",
                mensaje: "Payment not found"
            });
        }

        const populatedPayment = await Payment.findById(paymentUpdated._id).populate({ path: "consultation", populate: { path: "campus", populate: {path: 'clinic', select: '_id' }, select: 'clinic' }, select: 'campus' }).select('-__v');

        return res.status(200).send({
            status: "success",
            payment: populatedPayment
        });
    }).catch(() => {
        return res.status(404).json({
            status: "error",
            mensaje: "Error while finding and updating payment"
        });
    });
}

const uploadImage = async (req, res) => {
    try {
        const response = await cloudinary.v2.uploader.upload(req.file.path, { public_id: req.body.id });

        fs.unlinkSync(req.file.path);

        Payment.findOneAndUpdate({ _id: req.body.id }, { image: response.url }, { new: true }).then(async paymentUpdated => {
            if (!paymentUpdated) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "Payment not found"
                });
            }

            const populatedPayment = await Payment.findById(paymentUpdated._id).populate({ path: "consultation", populate: { path: "campus", populate: {path: 'clinic', select: '_id' }, select: 'clinic' }, select: 'campus' }).select('-__v');

            return res.status(200).send({
                status: "success",
                payment: populatedPayment
            });
        }).catch(() => {
            return res.status(404).json({
                status: "error",
                mensaje: "Error while finding and updating payment"
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
    list,
    myPaymentsClinicByCampus,
    editPayment,
    uploadImage
}