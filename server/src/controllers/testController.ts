import { Request, Response } from "express";
const test = async (req: Request, res: Response) => {
  res.send("Hello, you are good to exploit me");
};

export { test };
