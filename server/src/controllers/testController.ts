import { Request, Response } from "express";
const test = async (req: Request, res: Response) => {
  res.send("Hello from GameQuest");
};

export { test };
