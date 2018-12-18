const MongoClient = require('mongodb').MongoClient

let database, client

function db(){
  const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/test'
  if(database){
    return Promise.resolve(database)
  }else{
    return new Promise((resolve, reject)=>{
      MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, dbClient)=> {
        if(err){
          console.log('connection error:', err, dbUrl)
          reject(err)
        }else{
          client = dbClient
          database = client.db()
          resolve(database)
        }
      })
    })
  }
}

function close(){
  if(client){
    client.close()
    database = null
    client = null
  }
}

module.exports = {
  db,
  close
}
