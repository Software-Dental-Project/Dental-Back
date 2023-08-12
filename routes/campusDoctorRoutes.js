const express = require("express");
const router = express.Router();
const CampusDoctorController = require("../controllers/campusDoctorController");

router.post("/", CampusDoctorController.create);
router.get("/list", CampusDoctorController.list);
router.get("/campus", CampusDoctorController.getByCampusId);
router.get("/doctor", CampusDoctorController.getByDoctorId);

module.exports = router;