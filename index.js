const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3010;
const User = require('./schema');
require('dotenv').config();
app.use(express.static('static'));
app.use(express.json());



const uri = process.env.uri
mongoose.connect(uri)
.then(()=>{
  console.log('Database connected successfully!')
})
.catch((err)=>{
  console.log("error:",err)
})


app.put("/menu/:id",async (req,res)=> {

  const {id} = req.params;
  const {name,description,price} = req.body;
  try{

    const updatedItem = await User.findByIdAndUpdate(
      id,
      { $set: { name, description, price } },
      { new: true, runValidators: true } // Returns updated doc & runs validation
  );
  if(!updatedItem){
    return res.status(404).json({error:"Item not found!"});
  }

  res.json(updatedItem);
  }


  catch(err){
    res.status(400).json({error:"Invalid request"})
  }
})



app.delete('/menu/:id',async (req,res)=>{
  const {id}  = req.params;

  try{
    const deletedItem = User.findByIdAndDelete(id);

    if(!deletedItem){
      res.status(404).json({
        error:"Menu item not found"
      })
    }
    res.json({message:"Menu item deleted successfully"})


  }

  catch(err){
    res.status(400).json({error:"Invalid request!"})
  }

})





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
