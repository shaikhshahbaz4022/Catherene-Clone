const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb+srv://shahbaz:shahbazshaikh@cluster0.xbrsxxh.mongodb.net/shopvibe?retryWrites=true&w=majority")

module.exports = connection