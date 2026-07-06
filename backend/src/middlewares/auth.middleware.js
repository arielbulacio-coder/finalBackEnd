import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware.js';
import dotenv from 'dotenv';
dotenv.config();

export const protect = (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('No estás autenticado. Por favor inicia sesión para obtener acceso.', 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey_1234567890');

    // Grant access to user info
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Token inválido. Por favor inicia sesión nuevamente.', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.', 401));
    }
    return next(new AppError('Acceso no autorizado.', 403));
  }
};
