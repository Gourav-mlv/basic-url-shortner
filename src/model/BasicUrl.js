const mongoose = require('mongoose');
const BasicUrl = mongoose.Schema({
    alias: {
        type: String,
        unique: true,
        required: true
    },
    url:{
        type : String,
        required: true
    }
})

module.exports = mongoose.model('BasicUrl',BasicUrl);