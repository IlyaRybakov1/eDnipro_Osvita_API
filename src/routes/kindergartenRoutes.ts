import express from "express";
import kindergartenController from "../controllers/kindergartenController";

const router = express.Router();

router.get("/api/kindergartens", kindergartenController.fetchKindergartenBasic);
router.get(
  "/api/kindergarten/:id",
  kindergartenController.fetchKindergartenDetailsById
);
router.get(
  "/api/kindergarten/random/:numSchools",
  kindergartenController.fetchRandomKindergartens
);

export default router;
