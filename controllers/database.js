const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const global = require('./global');

var initialize = async function(){
   const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
   await client.connect();
   console.log("Connected To Database");
   global.db = client.db('test');
}


var saveInDatabase = async function(collection, obj){
   var result = global.db.collection(collection, obj);
   if(result.result.ok === '1')
      return {status: true, message: "Saved successfuly"};
   else return {status: false, message: "Cannot write in databse"}
}
module.exports.initialize = initialize;
module.exports.saveInDatabase = saveInDatabase;