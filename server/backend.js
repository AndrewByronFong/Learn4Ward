const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 6000;

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.status(200).json({ message: 'Login successful' });
    }
    else {
        res.status(401).json({ message: 'Login failed' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

