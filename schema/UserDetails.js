import mongoose from "mongoose";

const LoginUserSchema = new mongoose.Schema(
  {

    Email: {
      type: String,
      required: true, 
    },

   isNewUser: {
      type:String,
      default:true
   }

  },
  { timestamps: true }
);

export const User = mongoose.model("User", LoginUserSchema);
