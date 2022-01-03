import express from "express";
import products from "./data.js";
import { logger, auth } from "./middleWare.js";
const app = express();

// app.use(logger);
app.use([auth, logger]); // multiple middleware can be use like this
// the middleware will be executed in the same order as declare

app.listen(8080, (req, res) => {
  console.log("server is listening on http://localhost:8080");
});

app.get("/", (req, res) => {
  return "Hello world!";
});

app.get("/api/products", (req, res) => {
  const partial_products = products.map((product) => {
    return { id: product.id, name: product.name };
  });
  res.json(partial_products);
});

app.get("/api/products/:productID", (req, res) => {
  //route parameters
  const id = Number(req.params.productID);
  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  res.json(product);
});

app.get("/api/query", (req, res) => {
  const name = req.query.name.toLowerCase();
  const products_result = products.filter((product) =>
    product.name.toLowerCase().includes(name)
  );

  if (products_result.length < 1) {
    return res.status(200).send("No products matched your search");
  }

  res.json(products_result);
});

app.get("/about", (req, res) => {
  return res.send("About page");
});
