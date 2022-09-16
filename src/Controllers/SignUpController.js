import bcrypt from 'bcrypt';
import { db } from '../mongo.js';

dotenv.config();

export async function signUp(req, res){
  const {name, email, password} = req.body;
    try {
      const hash = bcrypt.hashSync(password, 10);
      const validEmail = await db.collection('Users').findOne({email});

      if (validEmail) {
        return res.status(409).json({ status: 409, message: "Email já utilizado" });
      }
      
      await db.collection('Users').insertOne({name, email, password: hash})
      
      return  res.status(201).json({ status: 201, message: "Usuário criado com sucesso" });

    } catch (error) {
      console.log(error.message);
      res.status(500);
    }
}