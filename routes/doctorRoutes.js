const express = require("express");
const router = express.Router();
const DoctorController = require("../controllers/doctorController");

const check = require("../authorization/auth");

router.post("/", check.auth, DoctorController.create);
router.get("/myDoctor", check.auth, DoctorController.myDoctor);
router.get("/list", DoctorController.list);
router.get("/", DoctorController.doctorById);

module.exports = router;