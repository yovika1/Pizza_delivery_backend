import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({

    name: {
         type: String,
          required: true 
        }, 
    quantity: { 
        type: Number,
         required: true 
        },
    lowStockNotification: {
        type:Boolean,
        default:false
    },

},{timestamps:true})

export const NotificationStock = mongoose.model('NotificationStock',StockSchema)