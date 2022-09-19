import { Router } from "express";
import getChart from "../Controllers/CartController.js";
import getHomePage from "../Controllers/HomePageControlle.js";
const router = Router();

router.get("/", getHomePage);

router.get("/cart", getChart);

export default router;

/* 
db.mugs.insertOne({
id: 0,
product: "caneca legal",
img: "link da imagem",
description: "outra descricao igualmente complexa",
preco: "5,00"}) 
*/
