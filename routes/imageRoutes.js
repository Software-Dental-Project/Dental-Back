const express = require("express");
const multer = require("multer");
const router = express.Router();
const ImageController = require("../controllers/imageController");

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

router.post("/", ImageController.create);
router.get("/myImagesClinicByCampus", check.auth, ImageController.myImagesClinicByCampus);
router.put("/", ImageController.editImage);
router.post("/image", upload.single('file'), ImageController.uploadImage);

module.exports = router;