const fs = require("fs").promises;
const path = require("path");
const db = require("./db");
// ![mongo db ==> No longer allows over riding of default _id hence cuid cannot be used hence no import of cuid]
//*[const cuid = require("cuid");]

// Path to product file
//* Changing from  reding from file on disk to MongoDb database
//?*const productsFile = path.join(__dirname, "./products.json");

// Declare the Schema of the Mongo model
var Product = db.model("Product", {
  _id: {
    type: String,
  },
  description: String,
  imgThumb: String,
  img: String,
  link: String,
  userId: String,
  userName: String,
  userLink: String,
  tags: { type: [String], index: true },
});



async function list(opts = {}) {
  //offset and limit for controlling  size of json response and where it statarts
  const { offset = 0, limit = 10, tag } = opts;

  const query = tag ? { tags: tag } : {};
  
  const products = Product.find(query).sort({ _id: asc }).skip(offset).limit(limit);
  return products

}

async function get(_id) {
  const product = await Product.findById(_id)
  return product
}

async function create(fields) {
  const product = await new Product(fields).save();
  return product;
}

async function edit(_id, fields){
  const product = await get(_id)
  await product.save();
  return product
}


async function remove(_id) {
  await Product.deleteOne(_id)
}

async function remove(id) {
  const product 
}





module.exports = {
  list,
  get,
  create,
};
