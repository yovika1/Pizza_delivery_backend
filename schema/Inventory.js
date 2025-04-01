import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({

  
  base: {
    type: Number,
    required: true,
  },
  sauce: {
    type: Number,
    required: true,
  },
  cheese: {
    type: String,
    required: true,
  },
  meat: {
    type: String,
    required: false,
  },

}, { timestamps: true });

export const Inventory = mongoose.model('Inventory', InventorySchema);


