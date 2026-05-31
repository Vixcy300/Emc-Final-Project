import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pizzas from './data/pizzas.js';
import Pizza from './models/Pizza.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const addPizzaData = async () => {
  try {
    // 1. Delete all existing pizzas in the database to do a clean sync of the 10 new local-photo pizzas
    const deleteResult = await Pizza.deleteMany({});
    console.log(`Removed ${deleteResult.deletedCount} old pizzas from database.`);

    // 2. Insert all the new pizzas with their local photos and names
    const insertResult = await Pizza.insertMany(pizzas);
    console.log(`Successfully imported ${insertResult.length} new gourmet pizzas with local photos!`);
    
    console.log('Database synchronization completed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error syncing pizzas: ${error}`);
    process.exit(1);
  }
};

addPizzaData();
