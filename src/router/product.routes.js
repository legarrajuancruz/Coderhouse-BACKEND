import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const ProductRouter = Router();
const product = new ProductManager();

/*============
-     GET    -
============*/
ProductRouter.get(`/`, async (req, res) => {
  res.send(await product.getProducts());
});

/*============
  -   GET ID   -
  ============*/
ProductRouter.get(`/:id`, async (req, res) => {
  let id = parseInt(req.params.id);
  res.send(await product.getProductsById(id));
});

/*============
  -    POST    -
  ============*/
ProductRouter.post("/", async (req, res) => {
  let newProduct = req.body;
  res.send(await product.addProducts(newProduct));
});

/*============
  - DELETE ID  -
  ============*/
ProductRouter.delete("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  res.send(await product.deleteById(id));
});

/*============
  -   PUT ID   -
  ============*/
ProductRouter.put("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let nuevo = req.body;
  res.send(await product.updateProduct(id, nuevo));
});

export default ProductRouter;
