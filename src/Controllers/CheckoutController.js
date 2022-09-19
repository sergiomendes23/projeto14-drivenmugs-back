import { db } from "../mongo.js";

async function Checkout() {
	try {
		const cart = await db.collection("cart").find().toArray();

		await db.colletion("sellsDb").insertOne({
			date: new Date(),
			products: cart,
			costumer: res.locals.user,
		});

		await db.collection("cart").deleteMany();

		res.send(201);
	} catch (error) {
		console.error("Error " + error.message);
	}
}
export default Checkout;
