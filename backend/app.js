const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const articlesRouter = require('./routes/articles');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("MongoDB connection established"));

app.use('/api/articles', articlesRouter);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running on port: ${port}`);
});
