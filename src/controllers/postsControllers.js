import getTodosPosts from "../models/postsModel.js";

export async function listarPosts(req, res) {
    // Busca todos os posts no banco de dados
    const posts = await getTodosPosts();
    // Envia os posts como resposta em formato JSON
    res.status(200).json(posts);
}