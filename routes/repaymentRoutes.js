const express = require('express');
const { recordRepayment } = require('../controllers/repaymentController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();
router.use(auth);

router.post('/', recordRepayment);

module.exports = router;
