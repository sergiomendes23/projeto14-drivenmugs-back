import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import joi from 'joi';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

let db;

mongoClient.connect().then(() => {
    db = mongoClient.db('drivenmugs');
});

export async function signUp(req, res){
    try {
        const {name, email, password} = req.body;
        const cryptPassword = bcrypt.hashSync(password, 10);
        const validEmail = await db.collection('Users').findOne({email});

        const newUserSchema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.required(),
        });
        
        const { error } = newUserSchema.validate({name, email, password});

        if(error){
            res.status(422).send(error)
            return
        }

        if (validEmail) {
            return res.status(409).send('Esse usuário já existe!');
        }
        await db.collection('Users').insertOne({name, email, password: cryptPassword})
        return res.sendStatus(200);

    } catch (error) {
        console.log(error.message);
    }
}

export async function signIn(req, res) {
    try{
        const {email, password} = req.body;
        const user = await db.collection('Users').findOne({email});
        const validPass = bcrypt.compareSync(password, user.password);

        const userSchema = joi.object({
            email: joi.string().email().required(),
            password: joi.required()
        });

        const { error } = userSchema.validate({email, password})

        if(error){
            res.sendStatus(422);   
            return
        }

        if (!user && !validPass) {
            return res.send(400);
        }
        if (!validPass) {
            return res.send(401);
        }

        const token = uuid()
        await db.collection('sessions').insertOne({token, userId: user._id, nome: user.name});
        const logUser = await db.collection('sessions').findOne({token});
        return res.status(200).send(logUser);

    } catch(error){
        console.log(error.message);
    }
}