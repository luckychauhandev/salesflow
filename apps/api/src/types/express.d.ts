import { User } from "../../generated/prisma/models";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        organizationId: string;
      };
    }
  }
}

export {};