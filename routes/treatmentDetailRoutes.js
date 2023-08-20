const express = require("express");
const router = express.Router();
const TreatmentDetailController = require("../controllers/treatmentDetailController");

router.post("/", TreatmentDetailController.create);
router.get("/list", TreatmentDetailController.list);
router.get("/", TreatmentDetailController.treatmentDetailById);
router.get("/consultationResult", TreatmentDetailController.getByConsultationResultId);
router.put("/", TreatmentDetailController.editTreatmentDetail);

module.exports = router;