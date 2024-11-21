import express from "express";
import validateSignup from "../middlewares/validation.js"; // Importer le middleware de validation
import { signupUser } from "../controllers/userController.js"; // Importer votre contrôleur pour gérer l'inscription

const router = express.Router();

// Route pour l'inscription avec validation des données
router.post("/signup", validateSignup, signupUser);

export default router;
