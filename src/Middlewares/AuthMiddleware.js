import { db } from '../mongo.js';

const validateToken = async (req, res, next) => {

  const unauthorized = () => res.status(401).json({ status: 401, message: "Acesso não autorizado" });
  const { authorization } = req.headers;
  if (!authorization) return unauthorized();

  const token = authorization.replace('Bearer ', '');
  if (!token) return unauthorized();

  try {
    const user = await db.collection('sessions').findOne({token});
    if (!user) return unauthorized();

    res.locals.user = user;
    next();

  } catch (error) {
    res.status(500);
  }
}

export default validateToken;