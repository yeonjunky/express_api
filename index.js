import express from "express";
import products from "./data.js";
const app = express();

app.listen(8080, (req, res) => {
  console.log("server is listening on port 8080");
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
    return res.status(404).send("Produnt not found");
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
