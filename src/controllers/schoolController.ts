import { Request, Response } from "express";
import schoolService from "../services/schoolService";

const fetchSchoolsBasic = async (req: Request, res: Response) => {
  try {
    const schools = await schoolService.fetchSchoolsBasic();
    res.json(schools);
  } catch (error: any) {
    console.error("Error fetching basic school data:", error.message);
    res.status(500).json({ message: "Failed to fetch basic school data" });
  }
};

const fetchSchoolDetailsById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const school = await schoolService.fetchSchoolDetailsById(id);
    res.json(school);
  } catch (error: any) {
    console.error(
      `Error fetching school details with id ${id}:`,
      error.message
    );
    res
      .status(500)
      .json({ message: `Failed to fetch school details with id ${id}` });
  }
};

const fetchRandomSchools = async (req: Request, res: Response) => {
  const numSchools = parseInt(req.params.numSchools, 10) || 3;

  try {
    const schools = await schoolService.fetchRandomSchools(numSchools);
    res.json(schools);
  } catch (error: any) {
    console.error("Error fetching random school data:", error.message);
    res.status(500).json({ message: "Failed to fetch random school data" });
  }
};

export default {
  fetchSchoolsBasic,
  fetchSchoolDetailsById,
  fetchRandomSchools,
};
