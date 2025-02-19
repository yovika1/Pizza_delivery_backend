import mongoose from "mongoose";


const Paymentschema = mongoose.Schema({
    intentId:{
        type: String
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "success", "rejected"],
        default:"pending"
    },
    customer_id: {
        type:String
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    amount : {
        type:String
    }
    

}, {    timestamps: true
})

  export const Payemnt = mongoose.model('Payment',Paymentschema);