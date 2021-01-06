import mongoose from 'mongoose';

const Schema = new mongoose.Schema({}, { strict: false });
const Image = mongoose.model('Image', Schema);

export default Image;
