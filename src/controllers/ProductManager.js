import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.path = "./src/dbjson/products.json";
  }

  /*============
- READ JSON  -
============*/
  readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(products);
  };

  /*============
- WRITE JSON -
============*/
  writeProducts = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product));
  };

  addProducts = async (product) => {
    let productsOld = await this.readProducts();
    product.id = productsOld.length;

    let productAll = [...productsOld, product];
    await this.writeProducts(productAll);

    return "Producto agregado";
  };

  getProducts = async () => {
    return await this.readProducts();
  };

  getProductsById = async (id) => {
    let products = await this.readProducts();
    let busquedaById = products.find((eL) => eL.id === id);
    if (!busquedaById) {
      return "Producto no encontrado";
    } else {
      return busquedaById;
    }
  };

  deleteById = async (id) => {
    let products = await this.readProducts();
    let busquedaId = products.some((eL) => eL.id === id);

    if (busquedaId) {
      let filtrados = products.filter((eL) => eL.id != id);
      await this.writeProducts(filtrados);
      return `"Producto eliminado"`;
    }
    return "Producto no existe";
  };
}

export default ProductManager;
