const fs = require("fs").promises;
const path = require("path");
const db = require("./db");
const cuid = require("cuid");

// Path to product file
//? Changing from  reding from file on disk to MongoDb database
//? const productsFile = path.join(__dirname, "./products.json");


// Declare the Schema of the Mongo model
var Product = db.model({
  _id: {
    type: String,
    default: cuid,
  },
  description: String,
  imgThumb: String,
  img: String,
  link: String,
  userId: String,
  userName: String,
  userLink: String,
  tags: { type: [String], index: true }

  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});


async function list(opts = {}) {
  //offset and limit for controlling  size of json response and where it statarts
  const { offset = 0, limit = 10, tag } = opts;

  const data = await fs.readFile(productsFile);
  return JSON.parse(data)
    .filter()
    .slice(offset, offset + limit);
}
async function get() {
  return { text: " Nothing here" };
}

module.exports = {
  list,
  get,
  productsFile,
};
