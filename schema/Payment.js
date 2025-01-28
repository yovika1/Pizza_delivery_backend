import mongoose, { Types } from "mongoose";

const paymentSchema = new mongoose.Schema({

    amount:{
        Types:Number
    }
    

},{timestamps:true})

export const GatewayPayment =  mongoose("GatewayPayment",paymentSchema)