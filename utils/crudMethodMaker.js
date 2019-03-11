module.exports = (db, resource) => ({
  find (req, res, next) {
    db(resource).then(items => res.status(200).json(items)).catch(next)
  },

  findById (req, res, next) {
    const { id } = req.params
    db(resource)
      .where({ id })
      .then(item => res.status(200).json(item))
      .catch(next)
  },

  create (req, res, next) {
    db(resource)
      .insert(req.body)
      .returning('*')
      .then(inserted => {
        res.status(201).json(inserted)
      })
      .catch(next)
  },

  update (req, res, next) {
    const { id } = req.params
    db(resource)
      .where({ id })
      .update(req.body)
      .returning('*')
      .then(updated => res.status(200).json(updated))
      .catch(next)
  },

  remove (req, res, next) {
    const { id } = req.params
    db(resource)
      .where({ id })
      .delete()
      .then(count => res.status(200).json(count))
      .catch(next)
  }
})
