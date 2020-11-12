const mongoose = require('mongoose');

let MONGO_URI = `mongodb://NodeServer:MfseqBUFCUKnmyIs@cluster0-shard-00-00.tdh3t.mongodb.net:27017,cluster0-shard-00-01.tdh3t.mongodb.net:27017,cluster0-shard-00-02.tdh3t.mongodb.net:27017/urlshortener?ssl=true&replicaSet=atlas-899pac-shard-0&authSource=admin&retryWrites=true&w=majority`

const connect = async ()=>{
    return mongoose.connect(MONGO_URI,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex : true
    }).then((res)=> {
        console.log("Connected to the server");
    }).catch(error => console.log(error))
}

module.exports = { connect }
