const express = require("express");
const router = express.Router();
const TreatmentAppointmentController = require("../controllers/treatmentAppointmentController");

router.post("/", TreatmentAppointmentController.create);
router.get("/list", TreatmentAppointmentController.list);
router.get("/", TreatmentAppointmentController.treatmentAppointmentById);
router.get("/treatmentDetail", TreatmentAppointmentController.getByTreatmentDetailId);

module.exports = router;