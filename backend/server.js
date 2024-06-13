require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema and Model
const resultSchema = new mongoose.Schema({
  name: String,
});

const Result = mongoose.model('Result', resultSchema);

// Routes
app.post('/save', async (req, res) => {
  const { name } = req.body;
  const newResult = new Result({ name });

  try {
    await newResult.save();
    res.status(200).send('Result saved successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error saving result');
  }
});

app.get('/getSaved', async (req, res) => {
    try {
        const results = await Result.find();
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send('Error fetching results');
    }
    });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  
});
