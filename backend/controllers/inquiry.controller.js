const db = require("../models");
const Inquiry = db.inquiry;
const Customer = db.customer;
const Car = db.cardex;

// Create and Save a new Inquiry
exports.create = async (req, res) => {
  const { customerId, carId, message, status } = req.body;

  if (!customerId || !carId || !message) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  try {
    // Validate foreign keys exist
    const [cust, car] = await Promise.all([
      Customer.findByPk(customerId),
      Car.findByPk(carId)
    ]);
    if (!cust || !car) {
      return res.status(400).send({ message: "Invalid customerId or carId." });
    }

    const inquiry = await Inquiry.create({ customerId, carId, message, status });
    res.send(inquiry);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the inquiry."
    });
  }
};

// Retrieve all Inquiries (with relations)
exports.findAll = (_req, res) => {
  Inquiry.findAll({ include: [Customer, Car] })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving inquiries."
      });
    });
};

// Find a single Inquiry by id (with relations)
exports.findOne = (req, res) => {
  const id = req.params.id;

  Inquiry.findByPk(id, { include: [Customer, Car] })
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Inquiry with id=${id} was not found.` });
    })
    .catch(_ => res.status(500).send({ message: "Error retrieving Inquiry with id=" + id }));
};

// Update an Inquiry by id
exports.update = (req, res) => {
  const id = req.params.id;

  Inquiry.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Inquiry was updated successfully." });
      else res.send({ message: `Cannot update Inquiry with id=${id}. Maybe Inquiry was not found or req.body is empty!` });
    })
    .catch(_ => res.status(500).send({ message: "Error updating Inquiry with id=" + id }));
};

// Delete an Inquiry by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Inquiry.destroy({ where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Inquiry was deleted successfully!" });
      else res.send({ message: `Cannot delete Inquiry with id=${id}. Maybe Inquiry was not found!` });
    })
    .catch(_ => res.status(500).send({ message: "Could not delete Inquiry with id=" + id }));
};
