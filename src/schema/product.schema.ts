import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(3, "Nome é obrigatório"),
    description: z.string().optional(),
    price: z.number().positive("O preço deve ser positivo"), // Atende ao requisito de decimal positivo
    stock_quantity: z.number().int("Deve ser um número inteiro").nonnegative(), // Atende ao requisito de inteiro
});

export const updateProductSchema = productSchema.partial();