import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const CartRouter = Router();
const cart = new CartManager();

/*============
-     GET    -
============*/
CartRouter.get(`/`, async (req, res) => {
  res.send(await cart.readCarts());
});

/*============
  -    POST    -
  ============*/
CartRouter.post("/", async (req, res) => {
  let newCart = req.body;
  res.send(await cart.addCarts(newCart));
});

export default CartRouter;
