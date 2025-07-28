"use client";

import users from "@/app/data/userData"
import { User } from "@/components/User/User";
import Link from "next/link";


const userDates: User[] = users

export default function Home() {
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {userDates.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.nome} {user.sobrenome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Action</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-gray-700 font-semibold">
                Quantidade de Usuários: {userDates.length}
            </div>
        </div>
    );
}
