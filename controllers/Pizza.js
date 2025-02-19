import { Pizza } from "../schema/Pizza.js";

export const createPizza = async (req, res) => {
  try {
    const { name, description, price, category, image, isAvailable } = req.body;

    if (!name || !price || !category || !image) {
      return res.status(400).json({
        message: "Pizza details are required",
      });
    }
    const newPizza = new Pizza({
      name,
      description,
      price,
      category,
      image,
      isAvailable,
    });

    const savedPizza = await newPizza.save();
    res.status(201).json(savedPizza);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all pizzas
export const getAll = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(200).json(pizzas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const get = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    res.status(200).json(pizza);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatedPizza = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const updatedPizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image },
      { new: true }
    );
    console.log(updatedPizza);
   if (updatedPizza) {
     return res.json({
       message:'pizza details updated succesfully',
       updatedPizza
     });
   } else {
      res.status(404).json({
        message:'pizza not found'
      })
   }
  } catch (error) {
    console.error("Error updating pizza:", error);

    res.status(500).json({ message: "Error updating pizza" });
  }
};

export const deletePizza = async(req, res) =>{
  try {
    const deletePizza = await Pizza.findByIdAndDelete( req.params.id);

    if (!deletePizza) {
      return res.status(404).
      json({
        message:'pizza not found'
      });
    }
    res.status(200).
    json({
      message:'pizza details deleted succesfully',
      deletePizza
    })

  } catch (error) {
    res.status(500).
    json({message:'Error deleting pizza', error});
  }    
}