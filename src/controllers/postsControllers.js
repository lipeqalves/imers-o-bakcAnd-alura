import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
    // Chama a função getTodosPosts do modelo para buscar todos os posts do banco de dados
    const posts = await getTodosPosts();
    // Envia os posts como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
    // Obtém os dados do novo post enviados no corpo da requisição
    const novoPost = req.body;
    try {
        // Chama a função criarPost do modelo para inserir o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Caso ocorra um erro, loga a mensagem de erro no console e envia uma resposta com status 500 (erro interno do servidor)
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

// Função assíncrona para fazer upload de imagem e criar um novo post
export async function uploadImagem(req, res) {
    // Cria um novo objeto de post com o título e descrição vazios e a URL da imagem
    const novoPost = {
        titulo: "",
        descricao: "",
        imgUrl: req.file.originalname,
    };

    try {
        // Chama a função criarPost para inserir o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Constrói o novo nome do arquivo da imagem com o ID do post criado
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Renomeia o arquivo da imagem para o novo nome, associando-o ao post
        fs.renameSync(req.file.path, imagemAtualizada);
        // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Caso ocorra um erro, loga a mensagem de erro no console e envia uma resposta com status 500 (erro interno do servidor)
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}


export async function atualizarNovoPost(req, res) {
    const id = req.params.id
    const urlImagem = `http://localhost:3000//${id}.png`
    const post = {
        titulo: rec.body.titulo,
        descricao: req.body.descricao,
        imgUrl: urlImagem
    }
    try {
       
        const postCriado = await atualizarPost(id,post);
       
        res.status(200).json(postCriado);
    } catch (erro) {
        
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}