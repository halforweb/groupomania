//* import the publication model
const Publication = require('../models/publication');

//* define and export the function allowing to manage likes
exports.likePublication = (req, res, next) => {
    //* the user like the publication and his id is not in the DB
    if (req.body.like === 1) {
        Publication.updateOne(
            { _id: req.params.id },
            {
                $inc: { likes: req.body.like++ },
                $push: { usersLiked: req.auth.userId },
            }
        )
            .then(() => res.status(200).json({ message: "Publication liked" }))
            .catch((error) => res.status(400).json({ error }));
    }
    //* the user disliked the publication and his id is not in the DB
    else if (req.body.like === -1) {
        Publication.updateOne(
            { _id: req.params.id },
            {
                $inc: { dislikes: req.body.like++ * -1 },
                $push: { usersDisliked: req.auth.userId },
            }
        )
            .then(() => res.status(200).json({ message: "Publication disliked" }))
            .catch((error) => res.status(400).json({ error }));
    }
    //* the user liked the publication previously and decides to delete his like
    else {
        Publication.findOne({ _id: req.params.id })
            .then((publication) => {
                if (publication.usersLiked.includes(req.auth.userId)) {
                    Publication.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.auth.userId }
                        }
                    )
                        .then(() => res.status(200).json({ message: "Publication deleted" }))
                        .catch((error) => res.status(400).json({ error }));
                }
                //* the user disliked the publication preivously and decides to delete his dislike 
                else if (publication.usersDisliked.includes(req.body.userId)) {
                    Publication.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: req.auth.userId }
                        }
                    )
                        .then(() => res.status(200).json({ message: "Publication deleted" }))
                        .catch((error) => res.status(400).json({ error }));
                }
            }
            )
            .catch((error) => res.status(400).json({ error }));
    }
};