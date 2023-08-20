const express = require("express");
const router = express.Router();
const CampusPatientController = require("../controllers/campusPatientController");

router.post("/", CampusPatientController.create);
router.get("/list", CampusPatientController.list);
router.get("/campus", CampusPatientController.getByCampusId);
router.get("/patient", CampusPatientController.getByPatientId);

module.exports = router;