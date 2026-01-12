import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import authRoutes from "./routers/auth.route.js";
import messageRoutes from "./routers/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app } from "./lib/socket.js";
import {server} from "./lib/socket.js"

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "5mb" }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Make ready for deployment
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server running on port : " + PORT);
  connectDB();
});
