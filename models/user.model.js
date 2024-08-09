const mongoose = require('mongoose');

const userSchema = mongoose.Schema({});

export const user = mongoose.model("User",userSchema);
