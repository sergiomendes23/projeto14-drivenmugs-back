import { v4 as uuid } from "uuid";
import { db } from "../mongo.js";

const signIn = async (req, res) => {
	const { _id, name, userLogin } = res.locals;
	console.log("chegou aquaaaai");

	try {
		const isUserLogged = await db
			.collection("sessions")
			.findOne({ userId: _id });
		const token = uuid();
		console.log("chegou aqui");
		if (isUserLogged) {
			await db
				.collection("sessions")
				.updateOne({ userId: _id }, { $set: { token } });
			const user = await db.collection("sessions").findOne({ token });
			res
				.status(200)
				.json({ status: 200, message: "Usuário logado com sucesso", token });
			//apagar token dps
		} else {
			await db
				.collection("sessions")
				.insertOne({ token, userId: _id, name, token });
			res
				.status(200)
				.json({ status: 200, message: "Usuário logado com sucesso", token });
		}

		res.send(token);
	} catch (error) {
		res.status(500);
	}
};

export default signIn;
