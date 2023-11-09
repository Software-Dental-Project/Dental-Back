const express = require("express");
const router = express.Router();
const EventController = require("../controllers/eventController");

const check = require("../authorization/auth");

router.post("/consultation", check.auth, EventController.createEventConsultation);
router.post("/treatmentAppointment", check.auth, EventController.createEventTreatmentAppointment);
router.get("/list", EventController.list);
router.get("/agenda", check.auth, EventController.getAgendaBySede);
router.get("/history", check.auth, EventController.getEventsBySede);
router.get("/historyClinic", check.auth, EventController.getEventsClinicBySede);

module.exports = router;