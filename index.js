const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const Port = process.env.PORT;

const app = express();

console.log(Port);


app.use(express.json());

app.get('/',(req,res) =>{
    res.send("Mellow World from Rohit")
});

//post api to add products 
app.post('/api/products', async (req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message :error.message});
    }
});

//get the product
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get products with their id 
app.get('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params ;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update a product 
app.put('/api/products/:id',async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndUpdate(id,req.body);

        if (!product){
            return res.status(404).json({message : "Product was not found."})
        }

        const updatedProduct = await Product.findById(id);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete a product 
app.delete('/api/products/:id',async (req,res) => {
    try {
        const {id} = req.params;  //this is object deconstructing

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



//connection to database
mongoose.connect('mongodb+srv://firstDbUser:meRohit@cluster0.etu0uue.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("Connected to database.!");
    app.listen(Port,()=>{
        console.log(`Server running on port ${Port}` );
    });
})
.catch(()=>{
    console.log("Connection failed");
})
