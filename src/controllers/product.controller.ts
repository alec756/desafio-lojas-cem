import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductService } from '../services/product.service';
import { z } from 'zod';

const productService = new ProductService();

const productSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    description: z.string().optional(),
    price: z.number().positive("O preço deve ser maior que zero"),
    stock_quantity: z.number().int().nonnegative("O estoque não pode ser negativo")
});

export class ProductController {

    async create(req: FastifyRequest, rep: FastifyReply) {
        try {
            const data = productSchema.parse(req.body);
            const product = await productService.createProduct(data);
            return rep.status(201).send(product);
        } catch (error: any) {
            return rep.status(400).send({ error: error.message });
        }
    }

    async index(req: FastifyRequest, rep: FastifyReply) {
        try {
            const products = await productService.listProducts();
            return rep.send(products);
        } catch (error: any) {
            return rep.status(500).send({ error: "Erro interno no servidor" });
        }
    }

    async findById(req: FastifyRequest, rep: FastifyReply) {
        const paramsSchema = z.object({ id: z.string().uuid() });
        try {
            const { id } = paramsSchema.parse(req.params);
            const product = await productService.getProduct(id);
            return rep.send(product);
        } catch (error: any) {
            return rep.status(404).send({ error: error.message });
        }
    }

    async update(req: FastifyRequest, rep: FastifyReply) {
        const paramsSchema = z.object({ id: z.string().uuid() });
        try {
            const { id } = paramsSchema.parse(req.params);
            const data = productSchema.parse(req.body);

            const product = await productService.updateProduct(id, data);
            return rep.send(product);
        } catch (error: any) {
            return rep.status(400).send({ error: error.message });
        }
    }

    async delete(req: FastifyRequest, rep: FastifyReply) {
        const paramsSchema = z.object({ id: z.string().uuid() });
        try {
            const { id } = paramsSchema.parse(req.params);
            await productService.deleteProduct(id);
            return rep.status(204).send();
        } catch (error: any) {
            return rep.status(400).send({ error: error.message });
        }
    }
}