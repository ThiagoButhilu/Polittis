"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
}

export default function Home() {
const [userData, setUserData] = useState<User[]>([]);

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/api/user', { method: 'GET', cache: 'no-store' });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched user data:', data);
            setUserData(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    fetchData();
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
            <div className="overflow-x-auto flex justify-center">
                <table className="min-w-2/3 divide-y divide-gray-200 border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Telefone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {userData.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="relative inline-block text-left">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            onClick={() => {
                                                const dropdown = document.getElementById(`dropdown-${user.id}`);
                                                if (dropdown) dropdown.classList.toggle("hidden");
                                            }}
                                        >
                                            Ações
                                            <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.063a.75.75 0 111.08 1.04l-4.25 4.667a.75.75 0 01-1.08 0l-4.25-4.667a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <div
                                            id={`dropdown-${user.id}`}
                                            className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden z-10"
                                        >
                                            <div className="py-1">
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => alert(`Excluir usuário ${user.id}`)}
                                                >
                                                    Excluir
                                                </button>
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => alert(`Modificar usuário ${user.id}`)}
                                                >
                                                    Modificar
                                                </button>
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => alert(`Ver endereço do usuário ${user.id}`)}
                                                >
                                                    Ver Endereço
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
                Quantidade de Usuários: {userData.length}
            </div>
        </div>
    );
}
