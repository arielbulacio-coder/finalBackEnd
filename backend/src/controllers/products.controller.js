import { ProductsService } from '../services/products.service.js';

export class ProductsController {
  static async getAll(req, res, next) {
    try {
      const products = await ProductsService.getAllProducts();
      res.status(200).json({
        status: 'success',
        results: products.length,
        data: products
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductsService.getProductById(id);
      res.status(200).json({
        status: 'success',
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const newProduct = await ProductsService.createProduct(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Producto creado exitosamente.',
        data: newProduct
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await ProductsService.deleteProduct(id);
      res.status(200).json({
        status: 'success',
        ...result
      });
    } catch (error) {
      next(error);
    }
  }
}
