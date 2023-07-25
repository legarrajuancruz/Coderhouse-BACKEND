import express from "express";
import ProductManager from "./controllers/ProductManager.js";

const product = new ProductManager();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*============
-     GET    -
============*/
app.get(`/products`, async (req, res) => {
  res.send(await product.getProducts());
});

/*============
-   GET ID   -
============*/
app.get(`/products/:id`, async (req, res) => {
  let id = parseInt(req.params.id);
  res.send(await product.getProductsById(id));
});

/*============
-    POST    -
============*/
app.post("/Products", async (req, res) => {
  let newProduct = req.body;
  res.send(await product.addProducts(newProduct));
});

/*============
-   DELETE   -
============*/
app.delete("/Products/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  res.send(await product.deleteById(id));
});

/*============
-     PUT    -
============*/
app.put("/Products/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let nuevo = req.body;
  res.send(await product.updateProduct(id, nuevo));
});

app.listen(PORT, () => {
  console.log(`Server port on ${PORT}`);
});
