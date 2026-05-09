import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { productRoutes } from './routes/product.routes';

const app = fastify();

app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});
app.register(productRoutes);

app.listen({ port: 3333 }).then(() => {
    console.log('🚀 Server running on http://localhost:3333');
});