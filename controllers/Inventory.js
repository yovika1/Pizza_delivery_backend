import { Inventory } from "../schema/Inventory.js";

export const createInventory = async (req, res) => {
    try {
      const { base, sauce ,cheese, meat} = req.body;
      console.log(".................",req.body)
      if (!base|| !sauce || !cheese || !meat) {
        return res. status(400). 
        json({
          message: "Missing required fields"
        });
      }
      

        const newItems = await Inventory.create({ base,sauce,cheese ,meat})

        await newItems.save();

        res.status(201).json({
                message: 'items Add into inventory successfully ',
                items:newItems
            })
        

    } catch (error) {
      res.status(400).json({ message: "Error adding item", error });
    }
  };

  export const getItems =  async (req, res) => {
    try {
      const items = await Inventory.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  export const updateInverntoryItem = async(req, res) =>{
    try {
      const updateItems = await Inventory.findByIdAndUpdate(req.params.id,
      req.body,{new:true})
      res.json({
        message:'updated successfully',
        updateItems
      })
    } catch (error) {
      console.error('errrorr.....',error),
      res.status(500).json({
        message: 'Internal server error',error
        
      })
    }
    }