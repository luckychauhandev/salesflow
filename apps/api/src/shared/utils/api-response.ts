import { Response } from "express";

export const successResponse = (
  res: Response,
  data: unknown,
  message = "Success",
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message = "Error",
  statusCode = 500,
  errors?: unknown,
) => {
  const response: Record<string, unknown> = {
    success: false,
    message,
  };

  if (errors !== undefined) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

export const createdResponse = (
  res: Response,
  data: unknown,
  message = "Created successfully",
) => {
  return successResponse(
    res,
    data,
    message,
    201,
  );
};

export const paginatedResponse = (
  res: Response,
  data: unknown,
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  },
  message = "Success",
) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination,
  });
};

export const noContentResponse = (
  res: Response,
) => {
  return res.status(204).send();
};