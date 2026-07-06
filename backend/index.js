import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Routes imports
import authRoutes from './src/routes/auth.routes.js';
import productRoutes from './src/routes/products.routes.js';

// Middlewares imports
import { errorHandler, AppError } from './src/middlewares/error.middleware.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Config CORS
app.use(cors());

// Config body-parser for JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic health check route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Servidor Backend - Proyecto Final activo',
    endpoints: {
      auth: {
        login: 'POST /auth/login'
      },
      products: {
        getAll: 'GET /api/products',
        getById: 'GET /api/products/:id',
        create: 'POST /api/products/create (requires auth)',
        delete: 'DELETE /api/products/:id (requires auth)'
      }
    }
  });
});

// Mounting routes
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);

// Unknown routes handler (404)
app.use((req, res, next) => {
  next(new AppError(`No se pudo encontrar la ruta ${req.originalUrl} en este servidor.`, 404));
});

// Global Error Handler
app.use(errorHandler);

// Listen to port
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
