import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Utilisé pour hacher le mot de passe

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true, // Supprime les espaces avant/après
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Garantit l'unicité de l'email
      lowercase: true, // Convertit automatiquement en minuscule
      match: [/.+@.+\..+/, "Veuillez entrer une adresse email valide."], // Validation regex
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Définit une longueur minimale pour le mot de passe
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Rôles possibles
      default: "user",
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

// Middleware avant la sauvegarde : hacher le mot de passe
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Si le mot de passe n'est pas modifié, passer au suivant
  }
  try {
    const salt = await bcrypt.genSalt(10); // Générer un sel
    this.password = await bcrypt.hash(this.password, salt); // Hacher le mot de passe
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour vérifier un mot de passe
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare le mot de passe fourni avec celui de l'utilisateur
};

// Exporter le modèle
export default mongoose.model("User", UserSchema);
