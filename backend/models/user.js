//* import mongoose and uniqueValidator 
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//* cretate the user schema with a unique email
const userSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }
});

//* apply the uniqueValidator plugin to the schema created
userSchema.plugin(uniqueValidator);

//* export the user schema into a model
module.exports = mongoose.model('User', userSchema);