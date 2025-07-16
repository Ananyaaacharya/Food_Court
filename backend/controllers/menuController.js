// backend/controllers/menuController.js

import MenuItem from "../models/MenuItem.js";
import fs from "fs";
import path from "path";

export const getMenuByCategory = async (req, res) => {
  try {
    const items = await MenuItem.find({ category: req.params.category });
    if (!items.length) {
      return res.status(404).json({ error: `No items found for category: ${req.params.category}` });
    }
    res.json(items);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const addMenuItem = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !price || !category || !image) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newItem = new MenuItem({ name, price, category, image });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("Add item error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.name = name || item.name;
    item.price = price || item.price;

    if (req.file) {
      if (item.image && item.image.startsWith("/uploads/")) {
        const filePath = path.join("uploads", path.basename(item.image));
        fs.unlink(filePath, (err) => {
          if (err) console.warn("Failed to delete old image:", err);
        });
      }
      item.image = `/uploads/${req.file.filename}`;
    }

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (item.image && item.image.startsWith("/uploads/")) {
      const filePath = path.join("uploads", path.basename(item.image));
      fs.unlink(filePath, (err) => {
        if (err) console.warn("Failed to delete image:", err);
      });
    }

    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
