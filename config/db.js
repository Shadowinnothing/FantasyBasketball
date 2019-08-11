const mongoose = require('mongoose')

const { mongoURI } = require('./keys')

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, { 
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log('Connected to MongoDB')
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB