import { Request, Response } from "express";
import kindergartenService from "../services/kindergartenService";

const fetchKindergartenBasic = async (req: Request, res: Response) => {
  try {
    const schools = await kindergartenService.fetchKindergartensBasic();
    res.json(schools);
  } catch (error: any) {
    console.error("Error fetching basic kindergarten data:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch basic kindergarten data" });
  }
};

const fetchKindergartenDetailsById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const school = await kindergartenService.fetchKindergartenDetailsById(id);
    res.json(school);
  } catch (error: any) {
    console.error(
      `Error fetching kindergarten details with id ${id}:`,
      error.message
    );
    res
      .status(500)
      .json({ message: `Failed to fetch kindergarten details with id ${id}` });
  }
};

const fetchRandomKindergartens = async (req: Request, res: Response) => {
  const numSchools = parseInt(req.params.numSchools, 10) || 3;

  try {
    const schools = await kindergartenService.fetchRandomKindergartens(
      numSchools
    );
    res.json(schools);
  } catch (error: any) {
    console.error("Error fetching random kindergarten data:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch random kindergarten data" });
  }
};

export default {
  fetchKindergartenBasic,
  fetchKindergartenDetailsById,
  fetchRandomKindergartens,
};
