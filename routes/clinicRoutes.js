const express = require("express");
const router = express.Router();
const ClinicController = require("../controllers/clinicController");

const check = require("../authorization/auth");

router.post("/", check.auth, ClinicController.create);
router.get("/myClinic", check.auth, ClinicController.myClinic);

module.exports = router;