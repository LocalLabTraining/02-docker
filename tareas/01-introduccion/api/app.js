const fastify = require('fastify');
const { Pool } = require('pg');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;

const config = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.POSTGRES_DB,
};

const pool = new Pool(config);

const app = fastify();

app.get('/todos', async (req, res) => {
    let client = null;
    try {
        client = await pool.connect();
        const { rows } = await client.query('SELECT * FROM todos');
        res.send(rows.map(row => ({ id: row.id, title: row.title, description: row.description })));
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to get todos' });
        return;
    } finally {
        if (client) {
            client.release();
        }
    }
});

app.get('/todos/:id', async (req, res) => {
    let client = null;
    const id = req.params.id;
    console.log(id);
    try {
        client = await pool.connect();
        const { rows } = await client.query('SELECT * FROM todos WHERE id = $1', [id]);
        res.send(rows.map(row => ({ id: row.id, title: row.title, description: row.description })));
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to get todo by id' });
        return;
    } finally {
        if (client) {
            client.release();
        }
    }
});

app.post('/todos', async (req, res) => {
    let client = null;
    try {
        client = await pool.connect();
        const todo = req.body;
        const id = crypto.randomUUID();
        await client.query('INSERT INTO todos (id, title, description) VALUES ($1, $2, $3)', [id, todo.title, todo.description]);
        todo.id = id;
        res.send(todo);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to add todo' });
        return;
    } finally {
        if (client) {
            client.release();
        }
    }
});

app.delete('/todos/:id', async (req, res) => {
    let client = null;
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    try {
        client = await pool.connect();
        await client.query('DELETE FROM todos WHERE id = $1', [id]);
        res.send({ message: 'Todo deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to delete todo' });
        return;
    } finally {
        if (client) {
            client.release();
        }
    }
});

app.put('/todos/:id', async (req, res) => {
    let client = null;
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    try {
        client = await pool.connect();
        await client.query('UPDATE todos SET title = $1, description = $2 WHERE id = $3', [req.body.title, req.body.description, id]);
        res.send({ message: 'Todo updated' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to update todo' });
        return;
    } finally {
        if (client) {
            client.release();
        }
    }
});

app.listen({ port: PORT, host: '0.0.0.0' }, () => {
    console.log(`Server is running on port ${PORT}`);
    pool.connect().catch(error => {
        console.error(error);
        process.exit(1);
    });
});