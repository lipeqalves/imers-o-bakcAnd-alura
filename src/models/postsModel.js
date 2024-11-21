import conectarAoBanco from "../config/dbconfig.js"

// Conecta ao banco de dados usando a string de conexão fornecida no ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)


// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {

        // Seleciona o banco de dados "imersao-instabytes"
        const db = conexao.db("imersao-instabytes")
        // Seleciona a coleção "posts"
        const colecao = db.collection("posts")
        // Retorna todos os documentos da coleção como um array
        return colecao.find().toArray()

}

export async function criarPost(novoPost) {
    try {
        // Conecta ao banco de dados "imersao-instabytes" e seleciona a coleção "posts"
        const db = conexao.db("imersao-instabytes");
        const colecao = db.collection("posts");
        // Insere um novo documento (post) na coleção "posts", retornando um objeto com informações sobre a inserção
        const result = await colecao.insertOne(novoPost);
        return { message: "Post criado com sucesso!", id: result.insertedId };

    } catch (error) {
        console.error("Erro ao criar post:", error);
        throw new Error("Erro ao criar post");
    }

}