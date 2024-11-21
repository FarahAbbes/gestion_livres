// routes/eventRoutes.js
import express from "express";
import { createEvent, fetchEvents } from "../controllers/eventController.js";
import validateEvent from "../middlewares/validateEvent.js";

const router = express.Router();

router.post("/events", validateEvent, createEvent); // Route pour créer un événement avec validation
router.get("/events", fetchEvents); // Route pour récupérer tous les événements

export default router;
