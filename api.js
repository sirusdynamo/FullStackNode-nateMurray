const Products = require("./models/products.js/index.js");

function respondText(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("hi");
}

function respondJson(req, res) {
  res.json({ text: "hi", numbers: [1, 2, 3] });
}

function respondEcho(req, res) {
  const { input = "" } = req.query;

  res.json({
    normal: input,
    shouty: input.toUpperCase(),
    characterCount: input.length,
    backwards: input.split("").reverse().join(""),
  });
}

function respondStatic(req, res) {
  const filename = `${__dirname}/public/${req.params[0]}`;
  fs.createReadStream(filename)
    .on("error", () => respondNotFound(req, res))
    .pipe(res);
}

function respondNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}

// async function listProducts(req, res) {
//   const productFile = path.join(__dirname, "./products.json");
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   const { offset = 0, limit = 20 } = req.query;
//   try {
//     const data = await fs.readFileSync(productFile);
//     res.json(JSON.parse(data));
//   } catch (err) {
//     res.status.json({ error: err.message });
//   }
// }

//   res.setHeader("Access-Control-Allow-Origin", "*");
//? offset limit and tag aprameters to filter JSON object returned by the
//? the get request
//? default values {limit = 20}, {offset = 0}

async function getProduct(req, res, next) {
  const { id } = req.params;

  const product = await Products.get(id);
  if (!product) return next();

  res.json(product);
}

async function listProducts(req, res, next) {
  const { offset = 0, limit = 25, tag } = req.query;

  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag,
  });
  if (!products) return next();

  res.json(products);
}

async function createProduct(req, res, next) {
  const product = await Products.create(req.body);
  res.json(product);
  next();
}
async function editProduct(req, res, next) {
  const id = req.params.id
  const change = req.body
  const product = Products.edit(id, change)
  res.json(product);
}

async function deleteProduct(req, res, next) {
  const id = req.params.id;
  await Products.remove(id);
  res.json({
    success: true,
  });
}


async function  createOrder(req, res, next){
  const order = await Order.create(req.body)
  res.json(order)
}

async function listOrders(req, res, next) {
  const { offset = 0, limit = 25, productId ,status} = req.query
  const id = req.params.id //? id  from the request parameters
  const order = await Order.list({
    offset: Number(offset),
    limit: Number(limit),
    status,
    productId
  })
  res.json(order)
}




module.exports = {
  listProducts,
  respondJson,
  respondEcho,
  respondNotFound,
  respondText,
  respondStatic,
  getProduct,
  createProduct,
  deleteProduct,
  editProduct,
};
