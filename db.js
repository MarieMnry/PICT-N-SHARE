const mongoUri = process.env.mongoUri || 'mongodb+srv://marie:Architecture2018@pictcluster-5bvau.mongodb.net/test?retryWrites=true&w=majority';
const MongoClient = require('mongodb').MongoClient;

module.exports = {
  mongoUri,
  MongoClient,
};
