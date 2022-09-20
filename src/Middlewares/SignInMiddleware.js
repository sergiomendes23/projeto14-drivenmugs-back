import { loginSchema } from "../schema.js";
import sanitize from "../sanitize.js";
import { db } from "../mongo.js";
import bcrypt from "bcrypt";

const validateSignIn = async (req, res, next) => {
	const loginValidation = loginSchema.validate(req.body, { abortEarly: false });
	console.log("validou");
	try {
		if (loginValidation.error) {
			const erros = sanitize(
				loginValidation.error.details.map((error) => error.message)
			);
			return res.status(422).json({ status: 422, message: erros });
		}
		console.log("deu try");
		const userLogin = {
			email: sanitize(req.body.email),
			password: req.body.password,
		};

		const { email, password } = userLogin;

		const user = await db.collection("users").findOne({ email });

		console.log("bora pro if");
		if (!user || !bcrypt.compareSync(password, user.password)) {
			res
				.status(401)
				.json({ status: 401, message: "Email ou senha incorretos" });
		}

		console.log("bora pros res");

		res.locals.userLogin = userLogin;
		res.locals._id = user._id;
		res.locals.name = user.name;
		res.locals.email = user.email;
		res.locals.password = user.password;
		console.log("veio aqui");
		next();
		console.log("nextou");
	} catch (error) {
		res.status(500);
	}
};

export default validateSignIn;
