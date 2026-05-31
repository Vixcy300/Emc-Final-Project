import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res, next) => {
  try {
    const { items, totalAmount, deliveryAddress } = req.body;

    if (items && items.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        items,
        customerId: req.user._id,
        totalAmount,
        deliveryAddress,
      });

      const createdOrder = await order.save();
      res.status(201).json({ success: true, data: createdOrder });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customerId: req.user._id }).populate('items.pizza');
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('customerId', 'id name').populate('items.pizza', 'name');
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json({ success: true, data: updatedOrder });
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete/Cancel an order
// @route   DELETE /api/orders/:id
// @access  Private
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      if (order.status !== 'Pending') {
        res.status(400);
        throw new Error('Can only cancel orders that are pending');
      }
      
      // Allow customer who owns it, or admin
      if (order.customerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to cancel this order');
      }

      await order.deleteOne();
      res.json({ success: true, message: 'Order cancelled' });
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// Exception Handling: Standardized order exception responses to maintain RESTful JSON standards.
// State Map: Controls flow transition from Pending -> Confirmed -> Preparing -> Dispatched -> Delivered.