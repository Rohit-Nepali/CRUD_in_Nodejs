const express = require('express');
const connectDB = require('./config/db.js');
const productRoute = require('./routes/product.routes');
const Port = process.env.PORT;

const app = express();  //initialize the express app

//middleware
app.use(express.json());

//routes
app.use('/api/products',productRoute);

//route to all url
app.get('/',(req,res) =>{
    res.send("Home Page")
});


//connect to database and start server
connectDB().
then(() =>{
    app.listen(Port,() =>{
        console.log(`Server running on ${Port}`);
    })
})
.catch(()=>{
    console.log("Connection failed");
})
