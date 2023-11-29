const express = require("express");
const multer = require("multer");
const router = express.Router();
const DoctorController = require("../controllers/doctorController");

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

router.post("/", check.auth, DoctorController.create);
router.post("/personData", DoctorController.createWithoutUser);
router.get("/myDoctor", check.auth, DoctorController.myDoctor);
router.get("/list", DoctorController.list);
router.get("/", DoctorController.doctorById);
router.get("/personData", DoctorController.searchDoctorByPersonDataId);
router.post("/image", upload.single('file'), DoctorController.uploadImage);

module.exports = router;