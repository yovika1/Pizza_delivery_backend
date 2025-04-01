import mongoose from "mongoose";

const PizzaSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    description:{
        type:String
    },
    image:{
        type:String,
        require:true
    },
    requirment:[{
        id : {
            type:String,
        },
        qunatity:{
            type: Number,
        }
    }],
    price: { 
        type: Number,
         required: true
         },

    category:{
        type:String,
        require:true,
    }, 
    isAvaiable:{
        type:Boolean,
        default:true
    }
} ,  { timestamps: true }
);
export const Pizza =  mongoose.model("Pizza",PizzaSchema)