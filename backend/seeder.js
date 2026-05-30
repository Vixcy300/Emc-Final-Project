import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pizzas from './data/pizzas.js';
import User from './models/User.js';
import Pizza from './models/Pizza.js';
import Order from './models/Order.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Pizza.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create([
      { name: 'Admin User', email: 'admin@pizzapalace.com', password: 'password123', role: 'admin' },
      { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'customer' }
    ]);

    const adminUser = createdUsers[0]._id;

    const samplePizzas = pizzas.map(pizza => {
      return { ...pizza }; // In case we want to associate adminUser, but pizza model doesn't need it.
    });

    await Pizza.insertMany(samplePizzas);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Pizza.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
