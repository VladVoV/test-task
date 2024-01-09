const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Marker = require('./model/markerModel');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());

app.post('/markers', async (req, res) => {
    try {
        const newMarker = new Marker(req.body);
        await newMarker.save();
        res.status(201).json(newMarker);
    } catch (error) {
        console.error('Error saving marker:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/markers', async (req, res) => {
    try {
        const markers = await Marker.find();
        res.json(markers);
    } catch (error) {
        console.error('Error retrieving markers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
