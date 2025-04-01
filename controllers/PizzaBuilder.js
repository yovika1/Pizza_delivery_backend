import stripe from "../config/stripe.js";
import { customPizza } from "../schema/PizzaBuilder.js";


export const pizzaBuilder = async(req,res) =>{
    try {
        const { pizzaBase , pizzaSauce , cheese , veggies ,totalPrice } = req.body;
        
        if (!pizzaBase ||  !pizzaSauce || !cheese  || !veggies.length) {
            return res.status(400).
            json({
                message: 'All fields are required'
            })
        }
        const customer = await stripe.customers.create({
            name: 'jenny Rosen',
            email:'jennyrosen@example.com',
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice * 100,
            currency:'INR',
            description: 'Software development services',
            shipping: {
                name: 'Rosen',
                address :{
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'san Francisco',
                    state: 'CA',
                    country: 'US',
                }
            },
            automatic_payment_methods: {enabled: true},
            customer:customer.id,
        });

        const newOrder = await customPizza.create({
            pizzaBase, pizzaSauce, cheese, veggies, totalPrice
        })
        newOrder.save()
        res.status(201).json({
            message: 'Order Placed Successfully',
            order: newOrder,
            paymentId: paymentIntent,
        });

    } catch (error) {

        res.status(500).json({
              message:'internal server error',
              error: error.message 
          })
    }
       
}