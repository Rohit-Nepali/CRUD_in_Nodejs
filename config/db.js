const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
        await mongoose.connect('mongodb+srv://firstDbUser:meRohit@cluster0.etu0uue.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=Cluster0');

        console.log("Connected to database");
    } catch (error) {
        console.error("connection Failed",error);
    }
}

module.exports = connectDB;


