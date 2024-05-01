const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific order by ID
router.get('/:id', getOrder, (req, res) => {
  res.json(res.order);
});

// Update a specific order by ID
router.put('/:id', getOrder, async (req, res) => {
  if (req.body.name != null) {
    res.order.name = req.body.name;
  }
  if (req.body.food != null) {
    res.order.food = req.body.food;
  }
  if (req.body.quantity != null) {
    res.order.quantity = req.body.quantity;
  }
  if (req.body.price != null) {
    res.order.price = req.body.price;
  }
  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// // Delete a specific order by ID
// router.delete('/:id', getOrder, async (req, res) => {
//   try {
//     // Remove the order from the database using the remove method of the retrieved order
//     await res.deleteOne();
//     res.status(200).json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// Delete a food order
router.delete('/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully', deletedOrder });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// Middleware to get order by ID
async function getOrder(req, res, next) {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    // order = res.order; // Assigning the fetched order to res.order
    next(); // Call next to proceed to the delete logic
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


module.exports = router;
