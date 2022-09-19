import { db } from "../mongo";

async function addCart(req, res) {
	console.log("Im alive bicth");
	const prod = req.id;

	try {
		const isAvailable = db.collection('Allproducts').find(id);

		if (!isAvailable) {
			res.send("Product not available");
			return;
		}

		await db.collection('cart').insertOne({
			id: prod.id,
			product: isAvailable.product,
			img: isAvailable.img,
			description: isAvailable.description,
			preco: isAvailable.preco,
		});
		const cart = await db.collection('cart').find().toArray();

		res.send(cart);
	} catch (error) {
		console.error("Error: " + error.message);
	}
}
export default addCart;
