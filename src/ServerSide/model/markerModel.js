const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
    position: {
        type: [Number],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
});

const Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;
