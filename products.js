const fs = require("fs").promises;
const path = require("path");

// Path to product file
const productsFile = path.join(__dirname, "./products.json");

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
