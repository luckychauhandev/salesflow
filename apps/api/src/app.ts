import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import { prisma } from "./infrastructure/database/prisma-client.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.get("/db-test", async (_, res) => {
  const count = await prisma.organization.count();

  res.status(200).json({
    success: true,
    count,
  });
});

export default app;