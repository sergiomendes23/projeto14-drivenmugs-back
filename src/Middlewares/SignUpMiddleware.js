import { userSchema } from "../schema.js";
import sanitize from "../sanitize.js";

const validateSignUp = async (req, res, next) => {
  const userValidation = userSchema.validate(req.body, { abortEarly: false });

  try {
    if(userValidation.error){
      const erros = sanitize(userValidation.error.details.map((error) => error.message));
      return res.status(422).json({ status: 422, message: erros });
    }
    const user = {
      name: sanitize(req.body.name),
      email: sanitize(req.body.email),
      password: req.body.password
    }
    req.body = user;
    next();
  } catch (error) {
    res.status(500);
  }
};

export default validateSignUp;