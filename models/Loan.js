const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  itemDescription: String,
  loanAmount: Number,
  balance: Number,
  issueDate: Date,
  dueDate: Date,
  frequency: { type: String, enum: ['bi-weekly', 'monthly'] },
  interestPercent: Number,
  graceDays: Number,
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
});

module.exports = mongoose.model('Loan', loanSchema);
