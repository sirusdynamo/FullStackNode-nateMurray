const mongoose = require('mongoose');

//** db.js is used to replace reading from the system file for the contents of the products */

mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/printshop",
    { useNewUrlParser: true, useCreateIndex:true })


module.exports = mongoose;