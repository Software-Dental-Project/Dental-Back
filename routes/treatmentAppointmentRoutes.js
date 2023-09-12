const express = require("express");
const router = express.Router();
const TreatmentAppointmentController = require("../controllers/treatmentAppointmentController");

const check = require("../authorization/auth");

router.post("/", TreatmentAppointmentController.create);
router.get("/list", TreatmentAppointmentController.list);
router.get("/", TreatmentAppointmentController.treatmentAppointmentById);
router.get("/treatmentDetail", TreatmentAppointmentController.getByTreatmentDetailId);
router.get("/patient", TreatmentAppointmentController.getByPatientId);
router.get("/doctor", TreatmentAppointmentController.getByDoctorId);
router.get("/myTreatmentAppointmentsByCampus", check.auth, TreatmentAppointmentController.myTreatmentAppointmentsByCampus);
router.put("/", TreatmentAppointmentController.editTreatmentAppointment);

module.exports = router;