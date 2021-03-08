const express = require('express'); // Criando uma variável importando o express do seu arquivo
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

function logRequests(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);
}

/** `GET` →  Quando queremos buscar uma informação no back-end**/
app.get('/projects', (request, response) => {
    const { title, owner } = request.query; // Usando query params!!! 

    const results = title ? projects.filter(project => project.title.includes(title)) : projects;

    return response.json(results);
});  

/** `POST` → Quando queremos criar uma informação no back-end*/   
app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project = { id: uuid(), title, owner};
    
    projects.push(project);

    return response.json(project);
});

/** `PUT/PATCH` →  Quando queremos alterar uma informação no no back-end*/  
app.put('/projects/:id', (request, response) =>{
    const { id } = request.params; // Usando route params para especificar os elementos!!!

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: "Project not found." })
    }

    const project = {
        id, 
        title,
        owner
    }

    projects[projectIndex] = project;

    return response.json(project);
});

/** `DELETE` →  Quando queremos deletar uma informação no no back-end */   
app.delete('/projects/:id', (request, response) =>{
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: "Project not found." })
    }

    projects.splice(projectIndex, 1);

    return response.send();
});

app.listen(3333, () => { // Colocamos uma função que é ativada instantaneamente quando o servidor está no ar
    console.log("🚀 Back-end started!");
}); // Criando uma porta de número 3333 -> localhost:3333