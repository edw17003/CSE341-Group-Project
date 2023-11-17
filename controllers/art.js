const db = require('../models');
const Art = db.Art;

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

  module.exports.getAllArts = (req, res) => {
    if (req.header('apiKey') === apiKey) {
      Art.find(
        {},
        {
          _id: 0,
          artId: 1,
          userId: 1,
          title: 1,
          description: 1,
          publicationDate: 1,
          genre: 1,
          image: 1
        }
      )
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'An error occurred while retrieving artworks.'
          });
        });
    } else {
      res.send('Invalid apiKey, please read the documentation,');
    }
  };
exports.getArt = (req, res) => {
  const artId = req.params.artId;
  if (req.header('apiKey') === apiKey) {
    Art.find({ artId: artId })
      .then((data) => {
        if (!data) res.status(404).send({ message: 'Not artwork found with artId: ' + artId });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving artwork with artId=' + artId,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation,');
  }
};

module.exports.createArt= (req, res) => {
  if (req.header('apiKey') === apiKey) {
    try {
      const art = new Art(req.body);
      art
        .save()
        .then((data) => {
          console.log(data);
          res.status(201).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'An error occurred while creating the artwork.'
          });
        });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.send('Invalid apiKey, please read the documentation,');
  }
};
module.exports.updateArt = async (req, res) => {
  if (req.header('apiKey') === apiKey) {
    try {
      const artId = req.params.artId;
      if (!artId) {
        return res.status(400).send({ message: 'Invalid artId Supplied' });
      }
      const art = await Art.findOne({ artId: artId });
      if (!art) {
        return res.status(404).json({ error: 'Artwork not found' });
      }
      art.artId = req.body.artId;
      art.userId = req.body.userId;
      art.title = req.params.title;
      art.description = req.body.description;
      art.publicationDate = req.body.publicationDate;
      art.genre = req.body.genre;
      art.image = req.body.image;
        
      const updatedArt = await art.save();

      // Respond with  status 204(whitout content)
      res.status(204).send();
      
      return res.json(updatedArt);

    } catch (err) {
      res.status(500).json({message: 'server internal error'});
    }
  } else {
    res.send('Invalid apiKey, please read the documentation,');
  }
};

module.exports.deleteArt = async (req, res) => {
  const artId = req.params.artId;
  if (req.header('apiKey') === apiKey) {
    try {
      if (!artId) {
        return res.status(400).send({ message: 'Invalid artId Supplied' });
      }
      const result = await Art.deleteOne({ artId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Artwork no found' });
      }
      return res.json({ message: 'Artwork removed correctly' });
    } catch (err) {
        return res.status(500).json({message: 'An error occurred while deleting the artwork.'});
    }
  } else {
    res.send('Invalid apiKey, please read the documentation,');
  }
};
