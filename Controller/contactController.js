Contact = require('../Modal/contactModel')

// Handle index actions

exports.index = function (req, res) {
  Contact.get((err, contacts) => {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      })
    }
    res.json({
      status: 'success',
      message: 'Contacts retrieved successfully',
      data: contacts,
    })
  })
}

// Handle create contact actions
exports.new = function (req, res) {
  var contact = new Contact()
  contact.name = req.body.name ? req.body.name : contact.name
  contact.gender = req.body.gender
  contact.email = req.body.email
  contact.phone = req.body.phone

  contact.save((err) => {
    if (err) res.jons(err)
    res.json({
      message: 'New contact created!',
      data: contact,
    })
  })
}

//Handle view contact info
exports.view = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err) res.jons(err)
    res.json({
      message: 'Contcat deatils Loading',
      data: contact,
    })
  })
}

//Handle Update contact info
exports.update = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err) res.send(err)
    contact.name = req.body.name ? req.body.name : contact.name
    contact.gender = req.body.gender
    contact.email = req.body.email
    contact.phone = req.body.phone
    // save the contact and check for errors
    contact.save((err) => {
      if (err) res.jons(err)
      res.json({
        message: 'Contact infor Updated!',
        data: contact,
      })
    })
  })
}

//Handle remove contact
exports.delete = function (req, res) {
  Contact.remove(function (err, contact) {
    Contact.remove(
      {
        _id: req.params.conatct_id,
      },
      () => {
        if (err) res.send(err)
        res.json({
          status: 'success',
          message: 'Contact deleted',
        })
      },
    )
  })
}
