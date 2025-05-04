const express = require('express');
const {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();
router.use(auth);

router.post('/', addCustomer);
router.get('/', getCustomers);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
