import mongoose from "mongoose";

const PizzaBuilder = new mongoose.Schema({

   pizzaBase:{
        type:String,
           require:true,
       },

       pizzaSauce:{
        type:String,
           require:true,
       },

       cheese :{
        type:String,
          require:true,
       },
       veggies:[{
        type:String,
           require:true,
       }],

       totalPrice:{
        type:Number,
       require:true,
    },

},{timestamps: true})

 export const customPizza = mongoose .model('customPizza',PizzaBuilder);