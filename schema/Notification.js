import mongoose from "mongoose";

const NotificationSchma = new mongoose.Schema({
    
    messages:{
        type: String,
        required: true
    },
    stockItem:{
        type: mongoose.Schema.ObjectId,
        ref: 'NotificationStock'
    },
    read:{
        type:Boolean,
        default:false
    },
    
}, { timestamps: true });

export const Notification = mongoose.model('Notification', NotificationSchma);
