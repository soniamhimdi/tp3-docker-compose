const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// GET /api/items — récupérer tous les items
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/items — ajouter un item
router.post("/items", async (req, res) => {
  try {
    const item = new Item({ title: req.body.title });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;