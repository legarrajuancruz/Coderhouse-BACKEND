import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/products`, ProductRouter);
app.use(`/api/carts`, CartRouter);
app.use(express.static(`./src/public`));

app.listen(PORT, () => {
  console.log(`Server port on ${PORT}`);
});
