import "dotenv/config";
import express from "express";
import cors from "cors";

import conn from "./config/conn.js";

// importações das tabelas
import "./models/animesModel.js";
import "./models/episodiosModel.js";

// importações das rotas
import animesRoutes from "./routes/animesRoutes.js"
import episodiosRoutes from "./routes/episodiosRoutes.js"

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Utilizações das rotas
app.use('/animes', animesRoutes)
app.use('/episodios', episodiosRoutes)

const PORT = process.env.PORT;

app.get("/", (request, response) => {
  response.send("Olá, Mundo!");
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});