import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:productID", getProduct);

router.post("/", createProduct);

router.put("/:productID", updateProduct);

router.delete("/:productID", deleteProduct);

export default router;
