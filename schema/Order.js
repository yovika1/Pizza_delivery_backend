import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
      require: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
          require: true,
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          require: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
                },
      },
    ],

    subtotal: {
      type: Number,
      required: true,
    },
    grandTotal: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
