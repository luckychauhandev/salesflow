import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodType) =>
    (req: Request, _res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);

        next();
      } catch (error) {
        next(error);
      }
    };