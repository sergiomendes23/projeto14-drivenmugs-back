import { db } from "../mongo";

async function getHomePage(res) {
	console.log("parece veridico");

	try {
		const Allproducts = await db.collecion("products").find().toArray();

		res.send(Allproducts);
	} catch (error) {
		console.error("Error: " + error.message);
	}
}
export default getHomePage;
