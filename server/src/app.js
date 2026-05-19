require('dotenv').config();

const express = require('express');

const cors = require('cors');
const path = require('path');
const parserRoute =
  require('./routes/parser_route');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/parser', parserRoute);
app.use(
  '/downloads',
  express.static(
    path.join(
      __dirname,
      '../downloads',
    ),
  ),
);
const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`,
  );
});