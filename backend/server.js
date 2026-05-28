import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import habitRoutes from "./routes/habits.js";
import logRoutes from "./routes/logs.js";
import aiRoutes from "./routes/ai.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";
// creating express app
const app = express();

// allowed origins
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// CORS options
const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);

    // allow localhost
    if (/^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
      return cb(null, true);
    }

    if (allowedOrigins.includes(origin)) return cb(null, true);

    return cb(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "1mb" }));

// health route
app.get("/api/health", (req, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() })
);

// middlewares
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);//mounting the habit routes under /api/habits
app.use("/api/logs", logRoutes);//mounting the log routes under /api/logs
app.use("/api/ai", aiRoutes);//mounting the AI routes under /api/ai

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

// connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});