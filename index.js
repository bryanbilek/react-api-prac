const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const connect = process.env.CONNECT;

app.use(express.json(), cors(), helmet());

mongoose.connect(`${connect}`, { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/', (req, res) => {
    res.send('Server Practice API Homepage')
})

app.listen(port, () => console.log(`listening on port${port}`));