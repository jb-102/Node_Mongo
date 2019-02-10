let mongoose = require('mongoose')
let settings = require('./appSettings.json')

let dbUrl = `mongodb://${settings.DB_HOST}:${settings.DB_PORT}/${settings.DATABASE}`

mongoose.Promise = global.Promise
mongoose.connect(dbUrl, {
  user: settings.DB_USERNAME,
  pass: settings.DB_PASSWORD,
  useNewUrlParser: true,
  authSource: 'admin'
})

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection is open to ', settings.DB_HOST)
})

mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection has occured ' + err + ' error')
})

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection is disconnected')
})

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection is disconnected due to application termination')
    process.exit(0)
  })
})

module.exports = mongoose