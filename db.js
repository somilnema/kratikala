const mongoose = require('mongoose');

const uri = 'mongodb+srv://kalakrati:Krati%40123@cluster0.xbvrwbq.mongodb.net/artgallery?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;