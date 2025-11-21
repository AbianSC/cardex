const db = require("../models");
const Customer = db.customer;

// Create and Save a new Customer
exports.create = (req, res) => {
  if (!req.body || !req.body.name || !req.body.email || !req.body.phone) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const customer = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };

  Customer.create(customer)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the customer."
      });
    });
};

// Retrieve all Customers
exports.findAll = (_req, res) => {
  Customer.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customers."
      });
    });
};

// Find a single Customer by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Customer with id=${id} was not found.` });
    })
    .catch(_ => res.status(500).send({ message: "Error retrieving Customer with id=" + id }));
};

// Update a Customer by id
exports.update = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Customer was updated successfully." });
      else res.send({ message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!` });
    })
    .catch(_ => res.status(500).send({ message: "Error updating Customer with id=" + id }));
};

// Delete a Customer by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.destroy({ where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Customer was deleted successfully!" });
      else res.send({ message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!` });
    })
    .catch(_ => res.status(500).send({ message: "Could not delete Customer with id=" + id }));
};
