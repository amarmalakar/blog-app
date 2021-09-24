const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () => {
        console.log('Connection is established with the MongoDB');
    })

    mongoose.connection.on('error', (err) => {
        console.log('Connection is not established with the MongoDB', err);
    })

    if (mongoose.connections[0].readyState) {
        console.log('Already Connected');
        return;
    }
}

export default dbConnect;