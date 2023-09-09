const express = require("express");
const router = express.Router();
const PatientController = require("../controllers/patientController");

const check = require("../authorization/auth");

router.post("/", check.auth, PatientController.create);
router.get("/myPatient", check.auth, PatientController.myPatient);
router.get("/list", PatientController.list);
router.get("/", PatientController.patientById);
router.get("/search", PatientController.searchPatient);

module.exports = router;