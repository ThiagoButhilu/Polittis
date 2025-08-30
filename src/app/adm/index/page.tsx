
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex w-full flex-col min-h-screen items-center justify-center bg-gray-50">
            <header className="w-full max-w-md bg-white shadow-md rounded-md p-6 mb-10 flex flex-col justify-center items-center">
                <h1 className="text-xl font-semibold text-gray-800 text-center">
                    Bem-vindo à área de administração!
                </h1>
                <h2>
                    Escolha o que deseja olhar!
                </h2>
            </header>
            <div className="min-w-4/5 flex gap-4 items-center">
                <Link href="/adm/kits" className="w-full">
                    <button className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                        Ver Kits
                    </button>
                </Link>
                <Link href="/adm/users" className="w-full">
                    <button className="w-full py-3 px-4 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition">
                        Ver Usuários
                    </button>
                </Link>
                <Link href="/adm/reports" className="w-full">
                    <button className="w-full py-3 px-4 bg-yellow-600 text-white rounded-md font-semibold hover:bg-yellow-700 transition">
                        Relatórios
                    </button>
                </Link>
                <Link href="/adm/products" className="w-full">
                    <button className="w-full py-3 px-4 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition">
                        Produtos
                    </button>
                </Link>
                <Link href="/adm/products/new" className="w-full">
                    <button className="w-full py-3 px-4 bg-amber-300 text-white rounded-md font-semibold hover:bg-amber-400 transition">
                        Novo Produto
                    </button>
                </Link>
            </div>
        </div>
    );
}
