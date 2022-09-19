import { db } from "../mongo";

async function addCart(req, res) {
	console.log("Im alive bicth");
	const prod = req.id;

	try {
		const isAvailable = db.Allproducts.find(id);

		if (!isAvailable) {
			res.send("Product not available");
			return;
		}

		await db.cart.insertOne({
			id: prod.id,
			product: isAvailable.product,
			img: isAvailable.img,
			description: isAvailable.description,
			preco: isAvailable.preco,
		});
		const cart = await db.cart.find().toArray();

		res.send(cart);
	} catch (error) {
		console.error("Error: " + error.message);
	}
}
export default addCart;
