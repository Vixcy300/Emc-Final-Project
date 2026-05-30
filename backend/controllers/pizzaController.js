import Pizza from '../models/Pizza.js';

// @desc    Fetch all pizzas
// @route   GET /api/pizzas
// @access  Public
export const getPizzas = async (req, res, next) => {
  try {
    const query = req.query.category ? { category: req.query.category } : {};
    // If not admin, maybe only fetch available pizzas, but for now fetch based on available or all if admin
    // We'll keep it simple: fetch all based on query. The frontend can filter `isAvailable` for customers.
    const pizzas = await Pizza.find(query);
    res.json({ success: true, count: pizzas.length, data: pizzas });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single pizza
// @route   GET /api/pizzas/:id
// @access  Public
export const getPizzaById = async (req, res, next) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (pizza) {
      res.json({ success: true, data: pizza });
    } else {
      res.status(404);
      throw new Error('Pizza not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a pizza
// @route   POST /api/pizzas
// @access  Private/Admin
export const createPizza = async (req, res, next) => {
  try {
    const { name, description, price, category, imageUrl, isAvailable } = req.body;
    
    const pizza = new Pizza({
      name,
      description,
      price,
      category,
      imageUrl,
      isAvailable
    });

    const createdPizza = await pizza.save();
    res.status(201).json({ success: true, data: createdPizza });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a pizza
// @route   PUT /api/pizzas/:id
// @access  Private/Admin
export const updatePizza = async (req, res, next) => {
  try {
    const { name, description, price, category, imageUrl, isAvailable } = req.body;

    const pizza = await Pizza.findById(req.params.id);

    if (pizza) {
      pizza.name = name || pizza.name;
      pizza.description = description || pizza.description;
      pizza.price = price !== undefined ? price : pizza.price;
      pizza.category = category || pizza.category;
      pizza.imageUrl = imageUrl || pizza.imageUrl;
      pizza.isAvailable = isAvailable !== undefined ? isAvailable : pizza.isAvailable;

      const updatedPizza = await pizza.save();
      res.json({ success: true, data: updatedPizza });
    } else {
      res.status(404);
      throw new Error('Pizza not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a pizza
// @route   DELETE /api/pizzas/:id
// @access  Private/Admin
export const deletePizza = async (req, res, next) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (pizza) {
      await pizza.deleteOne();
      res.json({ success: true, message: 'Pizza removed' });
    } else {
      res.status(404);
      throw new Error('Pizza not found');
    }
  } catch (error) {
    next(error);
  }
};
