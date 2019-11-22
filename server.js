const express = require('express');
const store = require('./routes/api/store')
// Constants
// eslint-disable-next-line no-bitwise
const PORT = process.env.PORT | 8080;

// App
const app = express();
app.use(express.json());

app.use('/api/stores', store)

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

// eslint-disable-next-line no-console
app.listen(PORT, () => { console.log(`Server is up and running on port ${PORT}`); });
