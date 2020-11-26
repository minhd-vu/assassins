const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log("MongoDB Connected!")).catch(err => {
    console.log(err.message);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});