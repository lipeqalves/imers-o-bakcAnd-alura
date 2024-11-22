import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, postarNovoPost } from "../controllers/postsControllers.js";

// Configura o armazenamento para arquivos enviados via upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define a pasta 'uploads' para salvar os arquivos enviados
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Mantém o nome original do arquivo enviado
        cb(null, file.originalname);
    }
})

// Cria um middleware para upload de arquivos usando o armazenamento configurado
const upload = multer({ dest: "./uploads", storage })
// Opção alternativa para Linux e macOS (sem armazenamento customizado):
// const upload = multer({ dest: "./uploads" })

// Função para configurar as rotas da aplicação
const routes = (app) => {
    // Permite que o servidor receba e processe dados no formato JSON
    app.use(express.json());

    // Rota GET para listar todos os posts (implementação na pasta controllers)
    app.get("/posts", listarPosts);

    // Rota POST para criar um novo post (implementação na pasta controllers)
    app.post("/posts", postarNovoPost)

    // Rota POST para upload de imagem (usa o middleware 'upload.single("imagem")' e chama a função 'uploadImagem')
    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", postarNovoPost)
}

// Exporta a função 'routes' para ser utilizada em outro arquivo
export default routes;