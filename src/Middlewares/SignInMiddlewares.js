import { loginSchema } from "../schema";
import sanitize from "../sanitize";
import { db } from "../mongo";

const validateSignIn = async (req, res, next) => {
  const loginValidation = loginSchema.validate(req.body, { abortEarly: false });

  try {
    if (loginValidation.error){
      const erros = sanitize(loginValidation.error.details.map((error) => error.message));
      return res.status(422).json({ status: 422, message: erros });
    }

    const login = {
      email: sanitize(req.body.email),
      password: req.body.password
    }
    const {email, password} = login;

    const user = await db.collection("users").findOne({email});
    if(!user){
      return res.status(401).json({ status: 401, message: "Email ou senha incorretos" });
    }
    
    res.body._id = user._id;
    res.body.name = user.name;
    res.body.email = user.email;
    res.body.password = user.password;
    next();

  } catch (error) {
    res.status(500);
  }
}