import jwt from 'jsonwebtoken';
import { AppError } from '../middlewares/error.middleware.js';
import dotenv from 'dotenv';
dotenv.config();

export class AuthService {
  static async login(username, password) {
    const expectedUser = process.env.ADMIN_USER || 'admin';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!username || !password) {
      throw new AppError('Por favor, ingresa el usuario y la contraseña.', 400);
    }

    if (username !== expectedUser || password !== expectedPassword) {
      throw new AppError('Credenciales inválidas. Acceso no autorizado.', 401);
    }

    const payload = {
      username,
      role: 'admin'
    };

    const jwtSecret = process.env.JWT_SECRET || 'supersecretjwtkey_1234567890';
    // Generate token
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '2h' });

    return {
      token
    };
  }
}
