import { Router } from "express";
import addCart from "../Controllers/AddCartController.js";
import getCart from "../Controllers/CartController.js";
import getHomePage from "../Controllers/HomePageControlle.js";
const router = Router();

router.get("/", getHomePage);

router.get("/cart", getCart);

router.post('/cart', addCart);

export default router;
