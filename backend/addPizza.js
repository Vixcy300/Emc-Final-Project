import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pizzas from './data/pizzas.js';
import Pizza from './models/Pizza.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const addPizzaData = async () => {
  try {
    for (const pizza of pizzas) {
      const exists = await Pizza.findOne({ name: pizza.name });
      if (!exists) {
        await Pizza.create(pizza);
        console.log(`Added new pizza: ${pizza.name}`);
      } else {
        console.log(`Pizza already exists: ${pizza.name}`);
      }
    }
    console.log('Database synchronization completed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error syncing pizzas: ${error}`);
    process.exit(1);
  }
};

addPizzaData();
