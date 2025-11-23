import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import linksRouter from "./routes/links.js";
import { requireAuth } from "./middleware/auth.js";
import prisma from "./prismaClient.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:5173",                   // Vite local
      "https://tiny-link-frontend-beta.vercel.app/"   // Correct Vercel domain
    ],
    credentials: true, // allows cookies/headers if needed
  })
);

app.use(bodyParser.json());

app.get("/healthz", (req, res) => res.json({ ok: true }));

// Auth APIs
app.use("/api/auth", authRouter);
app.use("/api/links", linksRouter);

// Authenticated route example
app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ ok: true, user: req.user });
});

// Root
app.get("/", (req, res) => res.json({ message: "tinylink backend" }));

// Short link redirect
app.get("/:code", async (req, res) => {
  const { code } = req.params;

  if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
    return res.status(404).send("Not Found");
  }

  try {
    const link = await prisma.link.findUnique({ where: { code } });
    if (!link || link.deleted) {
      return res.status(404).send("Not Found");
    }

    await prisma.link.update({
      where: { code },
      data: {
        totalClicks: { increment: 1 },
        lastClicked: new Date(),
      },
    });

    return res.redirect(302, link.target);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send("Server Error");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
