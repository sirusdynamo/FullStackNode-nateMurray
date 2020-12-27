// async function logFile(fileName) {
//   const filePath = path.join(__dirname, `${fileName}`);
//   console.log(filePath);
//   fs.readFile(filePath, (err, dataBuffer) => {
//     if (err) return console.error("Error reading file");
//     const dataString = dataBuffer.toString();
//     // console.log(dataString);
//     return JSON.parse(dataString);
//   }).t

// }

const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const middleware = require("./middleware")
const api = require("./api");
const port = process.env.PORT || 1337;

const app = express();


app.use(bodyParser.json())
//! cors header should come before any request handles 
//! the middleware.cors contains Access-Control-Allow-origin 
//! and other  headers  which allow  cors.

app.use(middleware.cors);
app.get("/", api.respondText);
app.get("/json", api.respondJson);
app.get("/echo", api.respondEcho);
app.get("/static/*", api.respondStatic);
app.get("/products", api.listProducts);
app.get("/products/:id", api.getProduct);
app.use(middleware.handleError);
app.use(middleware.notFound);

app.listen(port, () => console.log(`Server listening on port ${port}`));
