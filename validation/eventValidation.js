// validation/eventValidation.js
import Joi from "joi";

const eventSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Le titre est obligatoire.",
    "string.empty": "Le titre ne peut pas être vide.",
  }),
  startDate: Joi.date().required().messages({
    "any.required": "La date de début est obligatoire.",
    "date.base": "La date de début doit être une date valide.",
  }),
  endDate: Joi.date().greater(Joi.ref("startDate")).required().messages({
    "any.required": "La date de fin est obligatoire.",
    "date.greater": "La date de fin doit être après la date de début.",
    "date.base": "La date de fin doit être une date valide.",
  }),
});

export default eventSchema;
