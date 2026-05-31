import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    items: [
      {
        pizza: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Pizza',
        },
        qty: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'],
      default: 'Pending',
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;

// Model Overview: Houses item lists, status strings, customer records, and transaction total values.