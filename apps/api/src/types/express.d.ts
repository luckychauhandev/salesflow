import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        organizationId: string;
        email?: string;
      };
    }
  }
}

export { };