import type {
    Request,
    Response,
    NextFunction,
} from "express";
import { NotFoundError } from "./not-found-error.js";



export function notFoundHandler(
    _req: Request,
    _res: Response,
    next: NextFunction,
) {
    next(
        new NotFoundError(
            "Route not found",
        ),
    );
}