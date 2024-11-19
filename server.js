import express from "express";

//mock - teste com arrey em memoria
const posts = [
    // Objeto existente da imagem
    {
        id: 1,
        titulo: "Clique para recolher o intervalo.",
        descricao: "uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    // Novos objetos
    {
        id: 2,
        titulo: "Gatos fofinhos",
        descricao: "Uma seleção de fotos de gatinhos adoráveis",
        imagem: "https://placekitten.com/400/300"
    },
    {
        id: 3,
        titulo: "Receitas veganas deliciosas",
        descricao: "Aprenda a preparar pratos veganos saborosos e nutritivos",
        imagem: "https://picsum.photos/seed/picsum/400/300"
    },
    {
        id: 4,
        titulo: "Dicas de viagens para o Brasil",
        descricao: "Explore os destinos mais incríveis do Brasil",
        imagem: "https://source.unsplash.com/random/400x300/?brasil"
    },
    {
        id: 5,
        titulo: "Jogos clássicos para PC",
        descricao: "Reviva a nostalgia dos jogos de computador dos anos 90",
        imagem: "https://loremflickr.com/400/300/game,retro"
    },
    {
        id: 6,
        titulo: "Música para relaxar",
        descricao: "Uma playlist com as melhores músicas para aliviar o estresse",
        imagem: "https://placeimg.com/400/300/nature"
    }
];
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/api", (req,res)=>{
    res.status(200).send("Boas vindas à imersão!");
});

//exercicio aula 1
app.get("/livros", (req,res)=>{
    res.status(200).json(
        {
            "titulo": "O Senhor dos Anéis",
            "autor": "J.R.R. Tolkien",
            "ano": 1954
        }
    )
});
//exercicio aula 1
app.get("/sobre", (req,res)=>{
    res.status(200).json(
        {
            "nome": "Filipe Quirino Alves",
            "descricao": "Esta é uma aplicação de exemplo para a imersão Dev Back-End na Alura.",
            "versao": "1.0.0"
        }
    )
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});
function buscarPostPorId(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}
app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorId(req.params.id)
    res.status(200).json(posts[index]);
});