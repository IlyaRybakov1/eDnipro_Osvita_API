import express from "express";
import schoolController from "../controllers/schoolController";

const router = express.Router();

router.get("/api/schools", schoolController.fetchSchoolsBasic);
router.get("/api/schools/:id", schoolController.fetchSchoolDetailsById);
router.get(
  "/api/schools/random/:numSchools",
  schoolController.fetchRandomSchools
);

export default router;
