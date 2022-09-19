import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

import AuthRouter from './Routes/AuthRouter.js';

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config();

server.use(AuthRouter);
server.use(UnauthRouter);

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));