// src/models/MenuItem.js
import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['breakfast', 'meals', 'snacks', 'egg-items', 'chicken-items'],
  },
});

export default mongoose.model('MenuItem', menuItemSchema);