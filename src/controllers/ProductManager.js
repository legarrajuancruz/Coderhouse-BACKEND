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
    let busquedaById = await this.existe(id);
    if (!busquedaById) {
      return "Producto no encontrado";
    } else {
      return busquedaById;
    }
  };

  existe = async (id) => {
    let products = await this.readProducts();
    return products.find((eL) => eL.id === id);
  };

  deleteById = async (id) => {
    let products = await this.readProducts();
    let busquedaId = products.some((eL) => eL.id === id);

    if (busquedaId) {
      let filtrados = products.filter((eL) => eL.id != id);
      await this.writeProducts(filtrados);
      return `Producto eliminado`;
    }
    return "Producto no existe";
  };

  updateProduct = async (id, nuevo) => {
    let respuesta = await fs.readFile(this.path, "utf-8");
    let parseado = JSON.parse(respuesta);

    let busquedaFiltrada = parseado.filter((eL) => eL.id != id);

    console.log("NUEVO ARRAY");
    let modificado = [{ ...nuevo, id: id }, ...busquedaFiltrada];

    console.log(modificado);

    await fs.writeFile(this.path, JSON.stringify(modificado, null, 2, `\t`));
    return modificado[id];
  };
}

export default ProductManager;
