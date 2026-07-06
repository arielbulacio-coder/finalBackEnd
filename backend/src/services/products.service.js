import { ProductModel } from '../models/product.model.js';
import { AppError } from '../middlewares/error.middleware.js';

export class ProductsService {
  static async getAllProducts() {
    try {
      return await ProductModel.getAll();
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  static async getProductById(id) {
    try {
      const product = await ProductModel.getById(id);
      if (!product) {
        throw new AppError(`Producto con ID ${id} no encontrado.`, 404);
      }
      return product;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(error.message, 500);
    }
  }

  static async createProduct(data) {
    if (!data.name || !data.price) {
      throw new AppError('El nombre (name) y el precio (price) del producto son obligatorios.', 400);
    }
    if (isNaN(data.price) || data.price <= 0) {
      throw new AppError('El precio debe ser un número mayor a cero.', 400);
    }

    try {
      return await ProductModel.create(data);
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  static async deleteProduct(id) {
    try {
      const deleted = await ProductModel.delete(id);
      if (!deleted) {
        throw new AppError(`Producto con ID ${id} no encontrado para eliminar.`, 404);
      }
      return { message: 'Producto eliminado exitosamente.' };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(error.message, 500);
    }
  }
}
