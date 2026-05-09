import { FastifyInstance } from 'fastify';
import { ProductController } from '../controllers/product.controller';

const productController = new ProductController();

export async function productRoutes(app: FastifyInstance) {
    app.post('/products', (req, rep) => productController.create(req, rep));
    app.get('/products', (req, rep) => productController.index(req, rep));
    app.get('/products/:id', (req, rep) => productController.findById(req, rep));
    app.put('/products/:id', (req, rep) => productController.update(req, rep));
    app.delete('/products/:id', (req, rep) => productController.delete(req, rep));
}