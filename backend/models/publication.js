//* import mongoose 
const mongoose = require('mongoose');

//* create the publication schema
const publicationSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

//* export the publication schema into a model
module.exports = mongoose.model('Publication', publicationSchema);

