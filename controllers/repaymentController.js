const Loan = require('../models/Loan');
const Repayment = require('../models/Repayment');

exports.recordRepayment = async (req, res) => {
  const { loanId, amount, date } = req.body;
  const loan = await Loan.findById(loanId);
  if (!loan || loan.user.toString() !== req.user._id.toString())
    return res.status(404).json({ message: 'Loan not found' });

  loan.balance -= amount;
  if (loan.balance <= 0) {
    loan.status = 'paid';
    loan.balance = 0;
  }
  await loan.save();

  const repayment = await Repayment.create({ loan: loanId, amount, date });
  res.json(repayment);
};
