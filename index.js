import express from "express";
import products from "./data.js";
import { logger, auth, logBody } from "./middleWare.js";
import { isObjectValid } from "./util.js";
const app = express();

// app.use(logger);
app.use([logger]); // multiple middleware can be use like this
// the middleware will be executed in the same order as declare
app.use(express.json()); // parse json body content

app.listen(8080, (req, res) => {
  console.log("server is listening on http://localhost:8080");
});

app.get("/", (req, res) => {
  return "Hello world!";
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", logBody, (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };

  if (isObjectValid(newProduct)) {
    products.push(newProduct);
    res.status(201).json(newProduct);
  } else {
    res.status(400).send("name, price are undefined");
  }
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

app.put("/api/products/:productID", (req, res) => {
  const id = Number(req.params.productID);
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return res.status(404).send("Product not found");
  }
  const updatedProduct = {
    id: products[index].id,
    name: req.body.name,
    price: req.body.price,
  };
  products[index] = updatedProduct;
  res.status(200).json("Product updated");
});

app.delete("/api/products/:productID", (req, res) => {
  const id = Number(req.params.productID);
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    res.status(404).send("Product not found");
  }
  products.splice(index, 1);
  console.log(products);
  res.status(200).json("Product deleted");
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
