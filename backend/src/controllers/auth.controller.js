import { AuthService } from '../services/auth.service.js';

export class AuthController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const result = await AuthService.login(username, password);
      
      res.status(200).json({
        status: 'success',
        message: 'Sesión iniciada correctamente.',
        token: `Bearer ${result.token}`
      });
    } catch (error) {
      next(error);
    }
  }
}
