const mongoose = require('mongoose');
const schema = mongoose.Schema;

const DogSchema = new schema({
    Breedname: String,
    food: String,
    temprament: String
})
module.exports = mongoose.model ('dog',DogSchema);