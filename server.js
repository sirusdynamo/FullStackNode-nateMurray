

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const middleware = require("./middleware");
const api = require("./api");
const port = process.env.PORT || 1337;

const app = express();

// parse application/json

//! cors header should come before any request handles
//! the middleware.cors contains Access-Control-Allow-origin
//! and other  headers  which allow  cors.

app.use(middleware.cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", api.respondText);
app.get("/json", api.respondJson);
app.get("/echo", api.respondEcho);
app.get("/static/*", api.respondStatic);
app.get("/products", api.listProducts);
app.get("/products/:id", api.getProduct);
app.get("/orders", listOrders);
app.post("/orders", createOrder);

app.post("/products", api.createProduct);
app.put("/products/:id", api.editProduct);
app.delete("/products/:id", api.deleteProduct);
app.use(middleware.handleError);
app.use(middleware.notFound);

app.listen(port, () => console.log(`Server listening on port ${port}`));
