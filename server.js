require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

// Constants
// eslint-disable-next-line no-bitwise
const PORT = process.env.PORT | 8080;
// eslint-disable-next-line prefer-destructuring
const db = process.env.DB_URI;

// App
const app = express();

// DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected to MongoDB'))
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err))

app.use(express.json());

app.use('/api/', routes);

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

// eslint-disable-next-line no-console
app.listen(PORT, () => { console.log(`Server is up and running on port ${PORT}`); });
