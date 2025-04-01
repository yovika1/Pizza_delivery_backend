import stripe from "../config/stripe.js";
import { Order } from "../schema/Order.js";
// import { NotificationStock } from "../schema/Stock.js";

export const createOrder = async (req, res) => {
  try {

    const { userId, items, grandTotal, contactNumber, subtotal, address, email } = req.body;
    if (
      !items.length ||
      !subtotal || 
      !grandTotal ||
      !contactNumber ||
      !address
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // for(const item of items) {
    //   console.log("Checking stock for:", item.name);

    //   // const stockItem = await NotificationStock.findOne({ name: new RegExp(`^${item.name}$`, "i") });
    //   // console.log("************* Stock Found:", stockItem);

    //   // if (!stockItem) {

    //   //   return res.status(404).json({ message: `Stock item not found: ${item.name}` });
    //   // }

    //   if (!stockItem.quantity || stockItem.quantity < item.quantity) {
    //     return res.status(400).json({ message: `Not enough stock for ${item.name}` });
    //   }
    //   stockItem.quantity -= item.quantity;
  
    //   if(stockItem.quantity < 20){
    //     stockItem.lowStockNotification  = true;
    //   }
    //   await stockItem.save();
    // }

    const customer = await stripe.customers.create({
      name: "Jenny Rosen",
      email: "jennyrosen@example.com",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: grandTotal * 100,
      currency: "INR",
      description: "Software development services",
      shipping: {
        name: "Jenny Rosen",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
      automatic_payment_methods: { enabled: true },
      customer: customer.id,
    });

    const newOrder = new Order({
      userId,
      items,
      subtotal,
      grandTotal,
      contactNumber,
      address,
      email,
      paymentId: paymentIntent.id,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder,
      intent: paymentIntent,
    });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
};

  export const autoUpdatesOrders =  async (req, res) =>{
    try {
      const orders = await Order.find({status:{ $in:["pending", "preparing"]}});
      
      if (orders.length === 0) {
        return res.status(404).json({
          message:'order data not found'
        })
        
      }

      const updateOrders = [];

      for(const order of orders) {
        let newStatus = ''
        
        if (order.status === 'pending') {
          newStatus = 'preparing';
          
        } else if (order.status ==="preparing" ){
            newStatus = 'delivered';
          
        }
        if (newStatus) {
          order.status = newStatus
          await order.save();
          updateOrders.push(order);
          // console.log(`order ${order._id} updated to ${newStatus}`);
         
        }
      }

      res.status(200).json({
        message:'order update successfully',
        orders: updateOrders,
      })

    } catch (error) {
      console.log("Error updating order", error) ;
      res.status(500).json({error: 'Error updating orders'});
    }
 };
 
 export const updateInBackground = async (res) => {
   try {
      
     await autoUpdatesOrders({json:() =>{}},{status:()=>({json: () => {}})})
      
    } catch (error) {
      res.status.json({
        message:'internal error',error
      })
      console.error("Background auto-update error:", error);
    }
  }
