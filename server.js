import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Inicializa o servidor Express
const app = express();
app.use(express.static("uploads"))
routes(app)
// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// Rota raiz que retorna uma mensagem de boas-vindas
app.get("/api", (req, res) => {
    res.status(200).send("Boas vindas à imersão!");
});