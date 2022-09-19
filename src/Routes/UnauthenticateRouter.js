import { Router } from "express";
import getCart from "../Controllers/CartController.js";
import getHomePage from "../Controllers/HomePageControlle.js";
const router = Router();

router.get("/", getHomePage);

router.get("/cart", getCart);

export default router;
