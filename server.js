/**
 * server.js
 * Crease Edits — Express backend.
 *
 * Serves the static frontend (the .html/css/js files at the project root)
 * AND the REST API under /api/*. Session-based auth (no JWT) using
 * express-session with an in-memory store — swap the store for
 * connect-redis/connect-mongo etc. if this ever needs to run on more than
 * one server process.
 *
 * Run:
 *   npm install
 *   npm start
 * Then open http://localhost:3000
 *
 * Demo admin login (also in README.md):
 *   email:    admin@creaseedits.pk
 *   password: cre@seEdits2026
 */
const path = require("path");
const express = require("express");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const reviewRoutes = require("./routes/reviews");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------------
// Core middleware
// ---------------------------------------------------------------------------
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET || "crease-edits-dev-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      // secure: true, // enable once served over HTTPS in production
    },
  })
);

// Basic request log — handy while developing the admin panel / API.
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  }
  next();
});

// ---------------------------------------------------------------------------
// API routes
// ---------------------------------------------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// Unknown API route -> JSON 404 (kept separate from the HTML 404 page below)
app.use("/api", (req, res) => res.status(404).json({ error: "API route not found." }));

// ---------------------------------------------------------------------------
// Static frontend
// ---------------------------------------------------------------------------
app.use(express.static(path.join(__dirname), { extensions: ["html"] }));

// Any other unmatched (non-API) route -> the styled 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

// ---------------------------------------------------------------------------
// Central error handler
// ---------------------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Something went wrong." });
});

app.listen(PORT, () => {
  console.log(`Crease Edits server running at http://localhost:${PORT}`);
});
