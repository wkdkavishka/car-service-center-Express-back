import express from 'express';
// Import the controller functions
import { addACar, getAllCars, getACar, updateACar, deleteACar } from './controller';

// Create a router instance
const router = express.Router();

// Define routes --------------------------

// Home route: View all cars
router.get('/', getAllCars); // READ all cars

// View a single car by ID
router.get('/:id', getACar); // READ a specific car

// Add a new car
router.post('/', addACar); // CREATE a car

// Update an existing car by ID
router.patch('/:id', updateACar); // UPDATE a specific car

// Delete a car by ID
router.delete('/:id', deleteACar); // DELETE a specific car

//----------------------------------------

// Export the router module
export default router;
