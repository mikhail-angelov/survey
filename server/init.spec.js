const mongoUnit = require('mongo-unit')

mongoUnit.start()
  .then(url => {
    console.log('fake mongo is started: ', url)
    process.env.DATABASE_URL = url
    run()
  })

after(() => {
  const database = require('./db')
  console.log('stop')
  database.close()
  return mongoUnit.stop()
})