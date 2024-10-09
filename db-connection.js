const mongoose = require('mongoose');
const db = mongoose.connect(process.env['URI'])

module.exports = db;