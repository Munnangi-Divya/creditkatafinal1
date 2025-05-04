const express = require('express');
const {
  createLoan,
  getLoans,
  getLoanSummary,
  getOverdueLoans,
} = require('../controllers/loanController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();
router.use(auth);

router.post('/', createLoan);
router.get('/', getLoans);
router.get('/summary', getLoanSummary);
router.get('/overdue', getOverdueLoans);

module.exports = router;
