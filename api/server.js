require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", require("./routes/items"));

// Route de santé
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API fonctionnelle" });
});

// Connexion MongoDB — on utilise une variable d'environnement (bonne pratique !)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    app.listen(PORT, () => console.log(`🚀 API sur le port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Erreur MongoDB :", err.message);
    process.exit(1);
  });