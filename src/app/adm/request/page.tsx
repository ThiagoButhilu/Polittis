"use client";


import Link from "next/link";
import { useEffect, useState } from "react";


interface Kit {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity?: number;
    category: string;
    image_url?: string;
    components?: { name: string; quantity: number }[]; 
    type: string;
}


export default function Home() {

    const [kitsDate, setKitsDate] = useState<Kit[]>([]);


    const deleteKit = async (id: number) => {
        if(!confirm('Deseja realmente excluir este kit?')) return;
        try {
            const response = await fetch(`/api/product/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setKitsDate(kitsDate.filter(kit => kit.id !== id));
                alert('Kit excluído com sucesso!');
            } else {
                alert('Erro ao excluir o kit.');
            }
        } catch (error) {
            console.error('Error deleting kit:', error);
            alert('Erro ao excluir o kit.');
        }
    }
    
        useEffect(() => {
        const fetchProducts = async () => {
          const response = await fetch("/api/product?type=SIMPLE");
          const data = await response.json();
          console.log('Products fetched from API:', data.products);
          if(data.products.length > 0){
            setKitsDate(data.products);
          } else {
            alert('sem produtos')
          }
        };

        fetchProducts();
        }, []);

    return (
        <div className="p-6">
            <div className="text-black">
                <Link href="/adm/index">
                <button className="bg-blue-500 rounded-md text-white p-3">
                    Retornar
                </button>
                </Link>
            </div>
            <div className="overflow-visible flex justify-center">
                <table className="min-w-2/3 divide-y divide-gray-200 border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">quantidade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">descrição</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">preço</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {kitsDate.map((kit) => (
                            <tr key={kit.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kit.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kit.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kit.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kit.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kit.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div className="relative inline-block text-left">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            onClick={() => {
                                                const dropdown = document.getElementById(`dropdown-${kit.id}`);
                                                if (dropdown) dropdown.classList.toggle("hidden");
                                            }}
                                        >
                                            Ações
                                            <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.063a.75.75 0 111.08 1.04l-4.25 4.667a.75.75 0 01-1.08 0l-4.25-4.667a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <div
                                            id={`dropdown-${kit.id}`}
                                            className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden z-10"
                                        >
                                            <div className="py-1">
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => deleteKit(kit.id)}
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-gray-700 font-semibold">
                Quantidade de Usuários: {kitsDate.length}
            </div>
        </div>
    );
}
