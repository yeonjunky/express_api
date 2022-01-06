import express from "express";
import { logger, auth, logBody } from "./middleWare.js";
import products_routes from "./routes/products.js";
const app = express();

// app.use(logger);
app.use([logger]); // multiple middleware can be use like this
// the middleware will be executed in the same order as declare
app.use(express.json()); // parse json body content

app.listen(8080, (req, res) => {
  console.log("server is listening on http://localhost:8080");
});

app.use("/api/products", products_routes);
