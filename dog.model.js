import mongoose from 'mongoose';
const schema = mongoose.Schema;

const DogSchema = new schema({
    Breedname: String,
    food: String,
    temprament: String
})
const dogModel = mongoose.model ('dog',DogSchema);
export default dogModel;