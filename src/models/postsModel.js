import conectarAoBanco from "../config/dbconfig.js"

// Conecta ao banco de dados usando a string de conexão fornecida no ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)


// Função assíncrona para buscar todos os posts do banco de dados
export default async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes")
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts")
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray()
}