import { prisma } from '../lib/prisma';
import { Prisma, Product } from "@prisma/client";

export class ProductRepository {
    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        return await prisma.product.create({ data });
    }

    async findAll(): Promise<Product[]> {
        return await prisma.product.findMany({
            orderBy: { created_at: 'desc' }
        });
    }

    async findById(id: string): Promise<Product | null> {
        return await prisma.product.findUnique({ where: { id } });
    }

    async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
        return await prisma.product.update({ where: { id }, data });
    }

    async delete(id: string): Promise<void> {
        await prisma.product.delete({ where: { id } });
    }
}