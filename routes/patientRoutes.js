const express = require("express");
const multer = require("multer");
const router = express.Router();
const PatientController = require("../controllers/patientController");

const check = require("../authorization/auth");
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "./")
    },
    filename: (_req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post("/", check.auth, PatientController.create);
router.post("/personData", PatientController.createWithoutUser);
router.get("/myPatient", check.auth, PatientController.myPatient);
router.get("/list", PatientController.list);
router.get("/", PatientController.patientById);
router.get("/search", PatientController.searchPatient);
router.get("/personData", PatientController.searchPatientByPersonDataId);
router.put("/", PatientController.editPatient);
router.post("/image", upload.single('file'), PatientController.uploadImage);

module.exports = router;