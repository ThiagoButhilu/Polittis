'use client'

import { useState } from "react";
import Index from "../componentIndex";

export default function Home() {
    const [admPassword, setAdmPassword] = useState<string>("");

    const handlePasswordInput = () => {
        const password = prompt("Digite a senha de administrador:");
        if (password) {
            setAdmPassword(password);
        }
    };

    return (
        <div>
            {admPassword === process.env.NEXT_PUBLIC_ADM_PASSWORD_ACCESS ? (
               <Index />
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    
                    {admPassword !== "" && admPassword !== process.env.NEXT_PUBLIC_ADM_PASSWORD_ACCESS && (
                        <p className="text-red-500 mb-4">Senha incorreta. Tente novamente.</p>
                        )}
                    <h2 className="text-2xl mb-4">Acesso Restrito</h2>
                    <button
                        onClick={handlePasswordInput}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Inserir Senha
                    </button>
                </div>
            )}
        </div>
    );
}
