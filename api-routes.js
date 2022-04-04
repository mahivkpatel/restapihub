let router = require('express').Router()

// Import contact controller
var contactController = require('./Controller/contactController')

router.get('/', function (req, res) {
  res.json({
    status: 'API working',
    message: 'welcoe to the restapihub',
  })
})

// Contact routes
router
  .route('/contacts')
  .get(contactController.index)
  .post(contactController.new)

router
  .route('/contacts/:contact_id')
  .get(contactController.view)
  .patch(contactController.update)
  .put(contactController.update)
  .delete(contactController.delete)
module.exports = router
