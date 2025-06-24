export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Logo e descrição */}
                    <div>
                        <h3 className="font-parisienne text-3xl mb-2">The Politti's</h3>
                        <p className="text-sm text-gray-400">
                            Adoçando seus momentos mais especiais.
                        </p>
                    </div>
                    {/* Links rápidos */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Links Rápidos</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a className="text-gray-400 hover:text-white" href="#">
                                    Sobre Nós
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white" href="#">
                                    Produtos
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white" href="#">
                                    Contato
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white" href="#">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Redes sociais */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Siga-nos</h4>
                        <div className="flex space-x-4">
                            <a className="text-gray-400 hover:text-white" href="#">
                                <span className="material-icons">facebook</span>
                            </a>
                            <a className="text-gray-400 hover:text-white" href="#">
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4c2.21 0 4 1.791 4 4s-1.79 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441c.795 0 1.439-.645 1.439-1.441s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a className="text-gray-400 hover:text-white" href="#">
                                <span className="material-icons">email</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
                    <p>© 2023 The Politti's Doceria. Todos os direitos reservados.</p>
                    <p>
                        Feito com{" "}
                        <span className="material-icons text-xs text-pink-400 align-middle">
                            favorite
                        </span>{" "}
                        com muito carinho.
                    </p>
                </div>
            </div>
        </footer>
    );
};