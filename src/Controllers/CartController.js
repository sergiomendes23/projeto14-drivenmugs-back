import { db } from "../mongo";

async function getChart(res) {
	console.log("maybe this work");

	try {
		const cart = await db.session.find().toArray();

		res.send(cart);
	} catch (error) {
		console.error("Error: " + error.message);
	}
}

async function addCart(req, res) {
  console.log("Im alive bicth");

  try {

   
    
  } catch (error) {
    console.error("Error: " + error.message);
    
  }
}
export default getChart;