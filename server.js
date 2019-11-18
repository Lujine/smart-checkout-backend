'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT | 8080;

// App
const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, () => { console.log(`Server is up and running on port ${PORT}`) });
