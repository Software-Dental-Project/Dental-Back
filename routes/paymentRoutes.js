const express = require("express");
const multer = require("multer");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");

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

router.post("/", PaymentController.create);
router.get("/list", PaymentController.list);
router.get("/myPaymentsClinicByCampus", check.auth, PaymentController.myPaymentsClinicByCampus);
router.put("/", PaymentController.editPayment);
router.post("/image", upload.single('file'), PaymentController.uploadImage);

module.exports = router;