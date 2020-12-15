const express = require('express'); // Criando uma variável importando o express do seu arquivo

const app = express();

app.use(express.json());

/** `GET` →  Quando queremos buscar uma informação no back-end**/
app.get('/projects', (request, response) => {
    const { title, owner } = request.query; // Usando query params!!! 

    console.log(title);
    console.log(owner);

    return response.json([ // Cria uma resposta em arquivo JSON para ser enviada quando um usuário acessar a rota localhost:3333
        'Projeto 1',
        'Projeto 2',
        ]);
});  

/** `POST` → Quando queremos criar uma informação no back-end*/   
app.post('/projects', (request, response) =>{
    const body = request.body; // Usando Request Body!!!

    console.log(body);

    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3',
    ]);
});

/** `PUT/PATCH` →  Quando queremos alterar uma informação no no back-end*/  
app.put('/projects/:id', (request, response) =>{
    const params = request.params; // Usando route params para especificar os elementos!!!

    console.log(params);

    return response.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3',
    ]);
});

/** `DELETE` →  Quando queremos deletar uma informação no no back-end */   
app.delete('/projects/:id', (request, response) =>{
    return response.json([
        'Projeto 2',
        'Projeto 3',
    ]);
});

app.listen(3333, () => { // Colocamos uma função que é ativada instantaneamente quando o servidor está no ar
    console.log("🚀 Back-end started!");
}); // Criando uma porta de número 3333 -> localhost:3333