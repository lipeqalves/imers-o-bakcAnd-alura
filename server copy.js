import express from "express";
import conectarAoBanco from "./src/config/dbconfig.js";

// Conecta ao banco de dados usando a string de conexão fornecida no ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

// Inicializa o servidor Express
const app = express();
// Permite que o servidor receba dados JSON
app.use(express.json());

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// Função assíncrona para buscar todos os posts do banco de dados
async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes")
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts")
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray()
}

// Rota raiz que retorna uma mensagem de boas-vindas
app.get("/api", (req, res) => {
    res.status(200).send("Boas vindas à imersão!");
});

// Rota para buscar todos os posts
app.get("/posts", async (req, res) => {
    // Busca todos os posts no banco de dados
    const posts = await getTodosPosts();
    // Envia os posts como resposta em formato JSON
    res.status(200).json(posts);
});

