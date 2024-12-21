import jsonServer from 'json-server';
import cors from 'cors';
import path from 'path';

const server = jsonServer.create();
const router = jsonServer.router(path.join('db.json'));  // Use your actual db.json location
const middlewares = jsonServer.defaults();

// Enable CORS for all routes
server.use(cors());

// Use default middlewares (e.g., logger, static, CORS)
server.use(middlewares);

// Set up a route for your data
server.use('/api', router); // You can change the '/api' prefix if you want

// Start the server
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});