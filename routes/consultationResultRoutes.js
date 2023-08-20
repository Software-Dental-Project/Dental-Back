const express = require("express");
const router = express.Router();
const ConsultationResultController = require("../controllers/consultationResultController");

router.post("/", ConsultationResultController.create);
router.get("/list", ConsultationResultController.list);
router.get("/", ConsultationResultController.consultationResultById);
router.get("/consultation", ConsultationResultController.getByConsultationId);
router.put("/", ConsultationResultController.editConsultationResult);

module.exports = router;