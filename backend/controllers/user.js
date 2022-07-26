//* import the user model
const User = require('../models/User');

const ObjectID = require("mongoose").Types.ObjectId;

//* define and export the getAllUsers function without the password
module.exports.getAllUsers = (req, res, next) => {
    User.find().select("-password")
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

//* define and export the function allowing to get one user single user without the password
module.exports.getOneUser = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    User.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID unknown : " + err);
    }).select("-password");
};

//* define and export the function allowing to delete a user
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await User.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};