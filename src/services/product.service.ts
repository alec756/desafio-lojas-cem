import { ProductRepository } from '../repositories/product.repository';
import { Prisma, Product } from "@prisma/client";

export class ProductService {
    private repository: ProductRepository;
    constructor() {
        this.repository = new ProductRepository();
    }

    async listProducts() {
        return await this.repository.findAll(); // Use "this.repository"
    }


    async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
        if (Number(data.price) <= 0) {
            throw new Error("O preço do produto deve ser maior que zero.");
        }

        if (data.stock_quantity < 0) {
            throw new Error("A quantidade em estoque não pode ser negativa.");
        }

        return await this.repository.create(data);
    }

    async findById(id: string) {
        return await this.repository.findById(id);
    }

    async getProduct(id: string) {
        const product = await this.repository.findById(id);
        if (!product) throw new Error("Produto não encontrado.");
        return product;
    }

    async updateProduct(id: string, data: Prisma.ProductUpdateInput) {
        await this.getProduct(id);
        if (data.price && Number(data.price) <= 0) {
            throw new Error("O novo preço deve ser maior que zero.");
        }
        return await this.repository.update(id, data);
    }

    async deleteProduct(id: string) {
        await this.getProduct(id);
        return await this.repository.delete(id);
    }
}