const Loan = require('../models/Loan');
const Repayment = require('../models/Repayment');
const { isAfter } = require('date-fns');

exports.createLoan = async (req, res) => {
  const loan = await Loan.create({
    ...req.body,
    user: req.user._id,
    balance: req.body.loanAmount,
  });
  res.json(loan);
};

exports.getLoans = async (req, res) => {
  const loans = await Loan.find({ user: req.user._id }).populate('customer');
  res.json(loans);
};

exports.getOverdueLoans = async (req, res) => {
  const today = new Date();
  const loans = await Loan.find({ user: req.user._id, status: 'pending' });

  const overdue = loans.filter(
    (loan) => isAfter(today, new Date(loan.dueDate)) && loan.balance > 0
  );

  res.json(overdue);
};

exports.getLoanSummary = async (req, res) => {
  const loans = await Loan.find({ user: req.user._id });
  const repayments = await Repayment.find({});

  const totalLoaned = loans.reduce((sum, l) => sum + l.loanAmount, 0);
  const totalCollected = loans.reduce((sum, l) => sum + (l.loanAmount - l.balance), 0);
  const overdue = loans.filter((l) => isAfter(new Date(), new Date(l.dueDate)) && l.balance > 0);

  res.json({
    totalLoaned,
    totalCollected,
    overdueAmount: overdue.reduce((sum, l) => sum + l.balance, 0),
  });
};
