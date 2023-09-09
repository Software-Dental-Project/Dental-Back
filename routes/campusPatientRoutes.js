const express = require("express");
const router = express.Router();
const CampusPatientController = require("../controllers/campusPatientController");

const check = require("../authorization/auth");

router.post("/", CampusPatientController.create);
router.get("/list", CampusPatientController.list);
router.get("/campus", CampusPatientController.getByCampusId);
router.get("/myCampus", check.auth, CampusPatientController.getByMyCampus);
router.get("/search", check.auth, CampusPatientController.searchPatientsByMyCampus);
router.get("/patient", CampusPatientController.getByPatientId);

module.exports = router;