import { db } from '../config/firebase.js';

// In-memory mock database in case Firebase is not configured yet
let mockProducts = [
  {
    id: 'mock-initial-product-1',
    name: 'Teclado Mecánico RGB',
    description: 'Teclado mecánico con switches red, retroiluminación RGB y conexión USB-C.',
    price: 8500,
    category: 'Accesorios',
    stock: 15,
    createdAt: new Date().toISOString()
  }
];

export class ProductModel {
  static collectionName = 'products';

  static async getAll() {
    if (!db) {
      return mockProducts;
    }
    try {
      const snapshot = await db.collection(this.collectionName).get();
      const products = [];
      snapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
      });
      return products;
    } catch (error) {
      throw new Error(`Error al obtener productos de Firestore: ${error.message}`);
    }
  }

  static async getById(id) {
    if (!db) {
      const product = mockProducts.find(p => p.id === id);
      return product || null;
    }
    try {
      const doc = await db.collection(this.collectionName).doc(id).get();
      if (!doc.exists) {
        return null;
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw new Error(`Error al obtener el producto con id ${id}: ${error.message}`);
    }
  }

  static async create(data) {
    const newProduct = {
      name: data.name,
      description: data.description || '',
      price: Number(data.price),
      category: data.category || 'General',
      stock: Number(data.stock) || 0,
      createdAt: new Date().toISOString()
    };

    if (!db) {
      const id = `mock-id-${Date.now()}`;
      const productWithId = { id, ...newProduct };
      mockProducts.push(productWithId);
      return productWithId;
    }

    try {
      const docRef = await db.collection(this.collectionName).add(newProduct);
      return { id: docRef.id, ...newProduct };
    } catch (error) {
      throw new Error(`Error al crear el producto en Firestore: ${error.message}`);
    }
  }

  static async delete(id) {
    if (!db) {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) return false;
      mockProducts.splice(index, 1);
      return true;
    }

    try {
      const docRef = db.collection(this.collectionName).doc(id);
      const doc = await docRef.get();
      if (!doc.exists) {
        return false;
      }
      await docRef.delete();
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar el producto con id ${id}: ${error.message}`);
    }
  }
}
