const express = require("express");
const router = express.Router();
const PresupuestController = require("../controllers/presupuestController");

const check = require("../authorization/auth");

router.post("/", PresupuestController.create);
router.get("/list", PresupuestController.list);
router.get("/", PresupuestController.presupuestById);
router.get("/consultation", PresupuestController.getByConsultationId);
router.get("/myPresupuestsByCampus", check.auth, PresupuestController.myPresupuestsByCampus);
router.get("/myPresupuestsClinicByCampus", check.auth, PresupuestController.myPresupuestsClinicByCampus);
router.put("/", PresupuestController.editPresupuest);
router.delete("/", PresupuestController.deleteById);

module.exports = router;