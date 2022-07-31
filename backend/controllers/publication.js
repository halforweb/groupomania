//* import the publication model
const Publication = require('../models/publication');

//* import the file system package from node
const fs = require('fs');

//* define and export the function allowing to get all the publication
exports.getAllPublication = (req, res, next) => {
    Publication.find()
        .then(publications => res.status(200).json(publications))
        .catch(error => res.status(400).json({ error }));
};

//* define and export the function allowing to get the publication with a specific id
exports.getOnePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then((publication) => res.status(200).json(publication))
        .catch((error) => res.status(404).json({ error }));
};

//* define and export the function allowing to create a publication
exports.createPublication = (req, res, next) => {
    //* create a new publication object from the body with extraction of the id from the auth middleware and generation of the url for the image
    const publication = new Publication({
        userId: req.auth.userId,
        message: req.body.message,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    publication.save()
        .then(() => res.status(201).json({ message: 'Publication saved successfully!' }))
        .catch(error => res.status(400).json({ error }));
};

//* define and export the function allowing to modify a publication
exports.modifyOnePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id }) //* looking for the publication
        .then((publication) => {
            //* check the userId from the request is equal to the one in the DB or an admin
            if (publication.userId == req.auth.userId || req.auth.role === "admin") {
                //* We check if there is a file
                if (req.file) {
                    const filename = publication.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {
                        //* check if there is a field 'file' in the request 
                        const publicationObject = {
                            ...req.body,
                            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`, //*create a new url for the image
                        };

                        //* update the publication with new infos
                        Publication.updateOne({ _id: req.params.id }, { ...publicationObject }, { upsert: true })
                            .then(() => res.status(200).json({ message: 'Publication updated successfully!' }))
                            .catch(error => res.status(401).json({ error }));
                    });
                    //* if no file, we just update the publication with the body
                } else {
                    //* update the publication with new infos
                    Publication.updateOne({ _id: req.params.id }, {$set:{message:req.body.message}}, { upsert: true })
                        .then(() => res.status(200).json({ message: 'Publication updated successfully!' }))
                        .catch(error => res.status(401).json({ error }));
                }
            } else {
                res.status(403).json({ error: 'Not authorized' });
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


//* define and export the function allowing to delete a publication
exports.deleteOnePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id }) //* looking for the publication
        .then(publication => {
            //* check the userId from the request is equal to the one in the DB or an admin
            if (publication.userId = req.auth.userId || req.auth.role === "admin") {
                //* get the image 
                const filename = publication.imageUrl.split('/images/')[1];
                //* delete the image from the folder images and the record in the database related to the publication with relevant id selected
                fs.unlink(`images/${filename}`, () => {
                    Publication.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Publication deleted successfully !' }) })
                        .catch(error => res.status(401).json({ error }));
                });

            } else {
                res.status(401).json({ message: 'Not authorized' });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};



