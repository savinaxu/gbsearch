const db = require("../models")

const booksController = {
    findAll: function(req, res) {
        db.Book
          .find(req.query)
          .sort({ data: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findById: function(req, res) {
        db.Book
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    
}

module.exports = booksController