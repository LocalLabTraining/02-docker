const fastify = require('fastify');

const todos = [
    { id: 1, title: 'Todo 1', description: 'Description 1' },
    { id: 2, title: 'Todo 2', description: 'Description 2' },
    { id: 3, title: 'Todo 3', description: 'Description 3' },
];

const PORT = process.env.PORT || 3000;

const app = fastify();

app.get('/todos', async (req, res) => {
    res.send(todos);
});

app.post('/todos', async (req, res) => {
    const todo = req.body;
    todos.push(todo);
    res.send(todo);
});

app.listen({ port: PORT , host: '0.0.0.0'}, () => {
    console.log(`Server is running on port ${PORT}`);
});