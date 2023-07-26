import { promises as fs } from "fs";

class CartManager {
  constructor() {
    this.path = "./src/dbjson/carts.json";
  }

  /*============
- READ JSON  -
============*/
  readCarts = async () => {
    let carts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(carts);
  };

  /*============
- WRITE JSON -
============*/
  writeCarts = async (cart) => {
    await fs.writeFile(this.path, JSON.stringify(cart));
  };

  /*=============
-   ADD Carts   -
===============*/
  addCarts = async (cart) => {
    let cartsOld = await this.readCarts();

    cart.id = cartsOld.length;

    let cartAll = [cart, ...cartsOld];

    await this.writeCarts(cartAll);

    return "Carrito agregado";
  };

  /*=============
-   GET Carts    -
===============*/
  getCarts = async () => {
    return await this.readCarts();
  };
}

export default CartManager;
