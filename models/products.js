const fs = require("fs").promises;
const path = require("path");
const db = require("../db");
const { isURL } = require("validator")

// ![mongo db ==> No longer allows over riding of default _id hence cuid cannot be used hence no import of cuid]
//*[const cuid = require("cuid");]

// Path to product file
//* Changing from  reding from file on disk to MongoDb database
//?*const productsFile = path.join(__dirname, "./products.json");


function urlSchema({ required = true } = { required: false }) {
  console.log(required);
  return {
    type: String,
    required: required,
    validate: {
      validator: isURL,
      message: (props) => `${props.value} is not a valid URL`,
    },
  };
}


// Declare the Schema of the Mongo model
var Product = db.model("Product", {
  
  description: { type: String , required : true},
  imgThumb:  { type: String , required : true},
  img:  { type: String , required : true},
  link:  String,
  userId:  { type: String , required : true},
  userName:  { type: String , required : true},
  userLink:  { type: String , required : true},
  tags: { type: [String], index: true },
});



async function list(opts = {}) {
  //offset and limit for controlling  size of json response and where it statarts
  const { offset = 0, limit = 20, tag } = opts;

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
  const product = await get({ _id })
  Object.keys(fields).map(function (key) {
    product[key] = fields[key];
    console.log(product[key]);
  });
  await product.save();
  return product
}


async function remove(_id) {
  await Product.deleteOne({ _id })
}






module.exports = {
  list,
  get,
  create,
  edit,
  remove,
};
