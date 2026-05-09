import React, { useEffect, useState } from 'react';
import { api } from './services/api';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    stock_quantity: number;
}

export default function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState(''); // Estado para a barra de busca

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null); // Saber se estamos editando ou criando
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (err) {
            console.error("Erro ao buscar produtos:", err);
        }
    }

    function handleOpenCreateModal() {
        setEditingId(null);
        setName('');
        setDescription('');
        setPrice('');
        setStockQuantity('');
        setIsModalOpen(true);
    }

    function handleOpenEditModal(product: Product) {
        setEditingId(product.id);
        setName(product.name);
        setDescription(product.description);
        setPrice(String(product.price));
        setStockQuantity(String(product.stock_quantity));
        setIsModalOpen(true);
    }

    async function handleSaveProduct(event: React.FormEvent) {
        event.preventDefault();

        const payload = {
            name,
            description,
            price: Number(price),
            stock_quantity: Number(stockQuantity)
        };

        try {
            if (editingId) {
                const response = await api.put(`/products/${editingId}`, payload);
                setProducts(products.map(p => p.id === editingId ? response.data : p));
            } else {
                const response = await api.post('/products', payload);
                setProducts([...products, response.data]);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error("Erro ao salvar produto:", err);
            alert("Erro ao gravar. Verifique se o backend está preparado!");
        }
    }

    async function handleDeleteProduct(id: string) {
        const confirmDelete = window.confirm("Atenção: Deseja mesmo expurgar este registro?");
        if (confirmDelete) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                console.error("Erro ao deletar produto:", err);
                alert("Erro ao excluir.");
            }
        }
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 bg-zinc-950 min-h-screen text-zinc-300 font-sans selection:bg-red-500/30">

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-red-900/30 pb-6 gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-8 bg-red-600 rounded-sm shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                    <h1 className="text-3xl font-black tracking-wider text-white">
                        GESTÃO DE <span className="text-red-600">INVENTÁRIO</span>
                    </h1>
                </div>

                <div className="flex w-full md:w-auto gap-4">
                    {/* Barra de Pesquisa */}
                    <input
                        type="text"
                        placeholder="Buscar produto..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white p-2 px-4 rounded transition-colors placeholder:text-zinc-600 text-sm w-full md:w-64"
                    />

                    <button
                        onClick={handleOpenCreateModal}
                        className="bg-red-600/10 border whitespace-nowrap border-red-600 text-red-500 hover:bg-red-600 hover:text-white hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] px-6 py-2 rounded uppercase tracking-widest text-sm font-bold transition-all duration-300"
                    >
                        + Novo
                    </button>
                </div>
            </header>

            {/* Modal de Cadastro/Edição */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-zinc-900/90 p-8 rounded-lg border border-red-700/50 shadow-[0_0_40px_rgba(185,28,28,0.15)] w-full max-w-md">
                        <h2 className="text-2xl font-black text-white uppercase mb-6 tracking-wide border-l-4 border-red-600 pl-3">
                            {editingId ? "Editar Registro" : "Adicionar Registro"}
                        </h2>

                        <form onSubmit={handleSaveProduct} className="grid gap-5">
                            <input
                                type="text"
                                placeholder="NOME DO PRODUTO"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-zinc-950 border border-zinc-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white p-3 rounded transition-colors placeholder:text-zinc-600 text-sm"
                            />
                            <textarea
                                placeholder="DESCRIÇÃO TÉCNICA"
                                rows={3}
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-zinc-950 border border-zinc-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white p-3 rounded transition-colors placeholder:text-zinc-600 text-sm resize-none"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-zinc-500 text-sm">R$</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        required
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white p-3 pl-9 rounded transition-colors placeholder:text-zinc-600 text-sm"
                                    />
                                </div>
                                <input
                                    type="number"
                                    placeholder="ESTOQUE"
                                    required
                                    value={stockQuantity}
                                    onChange={(e) => setStockQuantity(e.target.value)}
                                    className="bg-zinc-950 border border-zinc-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white p-3 rounded transition-colors placeholder:text-zinc-600 text-sm"
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2 text-zinc-400 hover:text-white uppercase text-xs font-bold tracking-wider transition-colors"
                                >
                                    Abortar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-red-600 hover:bg-red-500 text-white px-8 py-2 rounded uppercase text-xs font-bold tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all"
                                >
                                    Gravar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Lista de Produtos filtrada */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group p-6 bg-zinc-900/50 rounded border border-zinc-800/80 hover:border-red-500/50 hover:bg-zinc-900 hover:shadow-[0_0_25px_rgba(220,38,38,0.1)] transition-all duration-300 relative overflow-hidden flex flex-col"
                    >
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors pr-2">{product.name}</h2>
                            <span className="bg-red-950/50 border border-red-900/30 text-red-500 px-2 py-1 rounded text-xs font-mono">
                                QTD: {product.stock_quantity}
                            </span>
                        </div>

                        <p className="text-zinc-500 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
                            {product.description}
                        </p>

                        <div className="flex justify-between items-end border-t border-zinc-800/50 pt-4 mt-auto">
                            <div className="flex flex-col">
                                <span className="text-xs text-zinc-600 uppercase font-semibold">Valor Unitário</span>
                                <span className="text-xl font-black text-white group-hover:text-red-500 transition-colors">
                                    R$ {Number(product.price).toFixed(2)}
                                </span>
                            </div>

                            {/* BOTOES DE AÇÃO: Editar e Excluir */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleOpenEditModal(product)}
                                    className="text-zinc-500 hover:text-white transition-colors text-xs uppercase font-bold tracking-wider px-2 py-1"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="text-zinc-500 hover:text-red-500 transition-colors text-xs uppercase font-bold tracking-wider px-2 py-1"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Mensagem caso a busca não encontre nada */}
                {filteredProducts.length === 0 && (
                    <div className="col-span-full text-center py-12 text-zinc-600 font-mono">
                        NENHUM REGISTRO ENCONTRADO.
                    </div>
                )}
            </div>
        </div>
    );
}