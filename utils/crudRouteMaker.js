module.exports = (router, handlers) => {
  const { find, findById, create, update, remove } = handlers
  find && router.get('/', find)
  findById && router.get('/:id', findById)
  create && router.post('/', create)
  update && router.delete('/:id', remove)
  remove && router.put('/:id', update)
}
