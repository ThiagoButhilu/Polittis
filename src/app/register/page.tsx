'use client'
import cookie from "@/../public/cookie (2).png"
import Image from "next/image";
import Link from 'next/link';
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { redirect } from 'next/navigation'


interface FormData {
  name: string;
  email: string;
  password: string;
  street: string;
  number: string;
  zip: string;
  city: string;
  district: string;
  state: string;
  complement?: string;
}


/*async function buscarDados() {
  try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({
                    name: 'João Silva',
                    email: 'joao@email.com',
                    password: 'senha123',
                    street: 'Rua Principal',
                    number: '123',
                    zip: '12345678',
                    city: 'São Paulo',
                    district: 'Centro',
                    complement: 'Apto 101'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.error);
            }

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Erro ao enviar formulário. Por favor, tente novamente.');
        }
} */



const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (data: FormData) => {

        console.log('Dados do formulário:', data);

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage(errorData?.error || errorData?.message);
            return;
            }
            
            redirect('/profile');
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Erro ao enviar formulário. Por favor, tente novamente.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl"> 
                {/* Header com logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-2 mb-4">
                        <div className="w-16 h-16 bg-sky-600 rounded-full flex items-center justify-center">
                            <Image src={cookie} alt="logo" width={200} height={300}/>
                        </div>
                    </Link>
                    <h1 className="text-2xl font-serif text-slate-800">The Politti&apos;s</h1>
                    <p className="text-slate-600">Doceria Artesanal</p>
                </div>

                {/* Card de Registro */}
                <div className="shadow-xl p-8 border-0 rounded-lg bg-white/80 backdrop-blur-sm">
                    {errorMessage && (
                        <div className="mb-4 rounded-2xl py-3 text-center bg-red-100 text-sm text-red-600">
                            {errorMessage}
                        </div>
                    )}
                    <div className="text-center">
                        <div className="text-2xl font-serif text-slate-800 flex items-center justify-center gap-2">
                            <LogIn className="w-6 h-6 text-sky-600" />
                            <span className="font-semibold">Registrar</span>
                        </div>
                        <div>
                            Crie sua conta para fazer pedidos
                        </div>
                    </div>

                    {/* Formulário de Registro */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4 pt-9 pb-9">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
                                    Email *
                                </label>
                                <input
                                    placeholder="Digite seu email"
                                    id="email"
                                    type="email"
                                    {...register("email", { required: "Email é obrigatório" })}
                                    className="bg-white/50 w-full border-1 rounded-sm p-2 border-gray-300"
                                />
                                {typeof errors.email?.message === "string" && (
                                    <span className="text-xs text-red-500">{errors.email.message}</span>
                                )}
                            </div>

                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
                                    Nome *
                                </label>
                                <input
                                    placeholder="Digite seu nome"
                                    id="name"
                                    type="text"
                                    {...register("name", { required: "Nome é obrigatório" })}
                                    className="bg-white/50 w-full border-1 rounded-sm p-2 border-gray-300"
                                />
                                {typeof errors.name?.message === "string" && (
                                    <span className="text-xs text-red-500">{errors.name.message}</span>
                                )}
                            </div>

                            {/* Senha */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
                                    Senha *
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Digite sua senha"
                                    {...register("password", { required: "Senha é obrigatória" })}
                                    className="bg-white/50 w-full border-1 rounded-sm p-2 border-gray-300"
                                />
                                {typeof errors.password?.message === "string" && (
                                    <span className="text-xs text-red-500">{errors.password.message}</span>
                                )}
                            </div>

                            {/* Endereço */}
                            <div className="pt-4">
                                <h2 className="text-lg font-semibold text-slate-700 mb-2">Endereço</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Rua */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="rua">
                                            Rua *
                                        </label>
                                        <input
                                            id="street"
                                            type="text"
                                            placeholder="Digite o nome da rua"
                                            {...register("street", { required: "Rua é obrigatória" })}
                                            className="bg-white/50 w-full border-1 rounded-sm p-2 border-gray-300"
                                        />
                                        {typeof errors.street?.message === "string" && (
                                            <span className="text-xs text-red-500">{errors.street.message}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="number">
                                            Número *
                                        </label>
                                        <input
                                            id="number"
                                            type="text"
                                            placeholder="Digite o número"
                                            {...register("number", { required: "Número é obrigatório" })}
                                            className="bg-white/50 w-full border-1 rounded-sm p-2 border-gray-300"
                                        />
                                        {typeof errors.number?.message === "string" && (
                                            <span className="text-xs text-red-500">{errors.number.message}</span>
                                        )}
                                    </div>
                                    {/* Complemento */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="complemento">
                                            Complemento
                                        </label>
                                        <input
                                            id="complemento"
                                            type="text"
                                            placeholder="Apartamento, bloco, etc."
                                            {...register("complement")}
                                            className="bg-white/50 w-full border-1 rounded-sm p-2 border-gray-300"
                                        />
                                    </div>
                                    {/* CEP */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="cep">
                                            CEP *
                                        </label>
                                        <input
                                            id="cep"
                                            type="text"
                                            placeholder="Digite o CEP"
                                            {...register("zip", { required: "CEP é obrigatório" })}
                                            className="bg-white/50 w-full border-1 rounded-sm p-2 border-gray-300"
                                        />
                                        {typeof errors.zip?.message === "string" && (
                                            <span className="text-xs text-red-500">{errors.zip.message}</span>
                                        )}
                                    </div>
                                    {/* Cidade */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="cidade">
                                            Cidade *
                                        </label>
                                        <input
                                            id="city"
                                            type="text"
                                            placeholder="Digite a cidade"
                                            {...register("city", { required: "Cidade é obrigatória" })}
                                            className="bg-white/50 w-full border-1 rounded-sm p-2 border-gray-300"
                                        />
                                        {typeof errors.city?.message === "string" && (
                                            <span className="text-xs text-red-500">{errors.city.message}</span>
                                        )}
                                    </div>
                                    {/* Bairro */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="district">
                                            Bairro *
                                        </label>
                                        <input
                                            id="district"
                                            type="text"
                                            placeholder="Digite o bairro"
                                            {...register("district", { required: "Bairro é obrigatório" })}
                                            className="bg-white/50 w-full border-1 rounded-sm p-2 border-gray-300"
                                        />
                                        {typeof errors.district?.message === "string" && (
                                            <span className="text-xs text-red-500">{errors.district.message}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="state">
                                            Estado *
                                        </label>
                                        <input
                                            id="state"
                                            type="text"
                                            placeholder="Digite o estado"
                                            {...register("state", { required: "Estado é obrigatório" })}
                                            className="bg-white/50 w-full border-1 rounded-sm p-2 border-gray-300"
                                        />
                                        {typeof errors.state?.message === "string" && (
                                            <span className="text-xs text-red-500">{errors.state.message}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Botão de registro */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded transition"
                                >
                                    Registrar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;