import { Router } from "express";
import { db } from "../mongo.js";

const router = Router();

router.get("/", async function getHomePage(req, res) {
	console.info("parece veridico");

	try {
		const Allproducts = await db.allProducts.find().toArray();

		res.send(Allproducts);
	} catch (error) {
		console.error("Error: " + error.message);
	}
});

router.get("/cart", async function chart(req, res) {
	console.info("maybe this work");
});

/* 
db.mugs.insertOne({
id: 0,
product: "caneca legal",
img: "link da imagem",
description: "outra descricao igualmente complexa",
preco: "5,00"}) 
*/
