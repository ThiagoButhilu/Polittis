'use client'

import { useState } from "react";
import Link from 'next/link';
import { LogIn, Eye, EyeOff } from "lucide-react";
import cookie from "@/../public/cookie (2).png"
import Image from "next/image";



const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
 // const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de login - aqui você integraria com sua API
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        
        // Aqui você redirecionaria o usuário após o login
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
        console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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

        {/* Card de Login */}
        <div className="shadow-xl p-5 border-0 rounded-lg bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-2xl font-serif text-slate-800 flex items-center justify-center gap-2">
              <LogIn className="w-6 h-6 text-sky-600" />
              <span className="font-semibold">Entrar</span>
            </div>
            <div>
              Acesse sua conta para fazer seus pedidos
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 pt-9 pb-9">
              <div className="relative space-y-2">
                <label htmlFor="email" className="mb-2 block font-semibold">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/50 w-full border-1 rounded-sm p-2 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="mb-2 block font-semibold">Senha</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-1 rounded-sm p-2 border-gray-300 bg-white/50 w-full pr-10"
                  />
                  <button
                    type="button"
                    
                    
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 text-slate-500" />
                    ) : (
                      <Eye className="h-4 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link 
                  href="/forgot" 
                  className="text-sky-600 hover:text-sky-700 hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <button 
                type="submit" 
                className="w-full p-2 font-semibold rounded-md text-white bg-sky-600 hover:bg-sky-700"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>

              <div className="text-center text-sm text-slate-600">
                Não tem uma conta?{" "}
                <Link 
                  href="/registro" 
                  className="text-sky-600 hover:text-sky-700 hover:underline font-medium"
                >
                  Cadastre-se aqui
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Link para voltar */}
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className="text-slate-600 hover:text-sky-600 transition-colors inline-flex items-center gap-1"
          >
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;