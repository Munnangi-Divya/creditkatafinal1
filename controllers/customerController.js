const Customer = require('../models/Customer');

exports.addCustomer = async (req, res) => {
  const customer = await Customer.create({ ...req.body, user: req.user._id });
  res.json(customer);
};

exports.getCustomers = async (req, res) => {
  const customers = await Customer.find({ user: req.user._id });
  res.json(customers);
};

exports.updateCustomer = async (req, res) => {
  const updated = await Customer.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteCustomer = async (req, res) => {
  await Customer.deleteOne({ _id: req.params.id, user: req.user._id });
  res.json({ message: 'Customer deleted' });
};
