const mongoose = require('mongoose')

async function connectToMongoBD(url){
    return mongoose.connect(url);
}

module.exports = { connectToMongoBD, }