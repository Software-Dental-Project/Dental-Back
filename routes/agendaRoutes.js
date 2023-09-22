const express = require("express");
const router = express.Router();
const AgendaController = require("../controllers/agendaController");

const check = require("../authorization/auth");

router.get("/", check.auth, AgendaController.getAgendaBySede);

module.exports = router;