import products from "../data.js";
import { isObjectValid, newId } from "../util.js";

const getProducts = (req, res) => {
  res.json(products);
};

const getProduct = (req, res) => {
  const id = Number(req.params.productID);
  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  res.json(product);
};

const createProduct = (req, res) => {
  const newProduct = {
    id: newId(products),
    name: req.body.name,
    price: req.body.price,
  };

  if (isObjectValid(newProduct)) {
    products.push(newProduct);
    res.status(201).json(newProduct);
  } else {
    res.status(400).send("name, price are undefined");
  }
};

const updateProduct = (req, res) => {
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
};

const deleteProduct = (req, res) => {
  const id = Number(req.params.productID);
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    res.status(404).send("Product not found");
  }
  products.splice(index, 1);
  console.log(products);
  res.status(200).json("Product deleted");
};

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
