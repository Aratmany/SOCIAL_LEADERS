const mongoose = require('mongoose')
const config = require('config')

const serverInit = async () => {
    try {
        await mongoose.connect(config.get('mongoURI'), {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true  
        })
        console.log('Mongo is here...')
    } catch (err) {
        console.error(err.message)
        process.exit(1)        
    }
}

module.exports = serverInit