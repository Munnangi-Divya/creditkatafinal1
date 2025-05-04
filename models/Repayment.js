const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema({
  loan: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
  amount: Number,
  date: Date,
});

module.exports = mongoose.model('Repayment', repaymentSchema);
