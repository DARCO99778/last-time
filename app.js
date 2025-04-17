const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const adminRouter = require("./api/admin");
const authRouter = require("./api/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "3d8c4b1f89a74e9c52f58f69e90a6b3d23f64b32c7a889e4cb9f2d86c7e4a2b3",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// API Routes
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

// Serve HTML files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// Start Server (only for local testing)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;



