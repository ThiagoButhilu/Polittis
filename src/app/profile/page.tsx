'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User, MapPin, Save, Edit3 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
 import type { FieldErrors } from "react-hook-form";

const profileSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    sobrenome: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
    endereco: z.object({
        rua: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
        numero: z.string().min(1, "Número é obrigatório"),
        complemento: z.string().optional(),
        bairro: z.string().min(2, "Bairro é obrigatório"),
        cidade: z.string().min(2, "Cidade é obrigatória"),
        estado: z.string().min(2, "Estado é obrigatório"),
        cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido")
    })
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            nome: "",
            sobrenome: "",
            email: "",
            telefone: "",
            endereco: {
                rua: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                estado: "",
                cep: ""
            }
        }
    });

    const { register, handleSubmit, formState } = form;

    const onSubmit = async (data: ProfileFormData) => {
        try {
            console.log("Dados do perfil:", data);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsEditing(false);
        } catch (error) {
           console.log(error)
        }
    };

    // Helper to get nested errors
   

    const getError = (name: string) => {
        const keys = name.split(".");
        let error: FieldErrors<ProfileFormData> | undefined = formState.errors;
        for (const key of keys) {
            if (!error) return undefined;
            error = (error as Record<string, unknown>)[key] as FieldErrors<ProfileFormData> | undefined;
        }
        if (typeof error === "object" && error !== null && "message" in error) {
            return (error as { message?: string }).message;
        }
        return undefined;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header da página */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-serif text-slate-800 mb-2">Meu Perfil</h1>
                        <p className="text-slate-600">Gerencie suas informações pessoais e endereço de entrega</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Informações Pessoais */}
                        <div className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <div className="flex flex-row items-center justify-between p-4">
                                <div>
                                    <div className="text-xl font-serif text-slate-800 flex items-center gap-2">
                                        <User className="w-5 h-5 text-sky-600" />
                                        Informações Pessoais
                                    </div>
                                    <div className="text-slate-500 text-sm">
                                        Suas informações básicas para identificação
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="border-sky-600 text-sky-600 hover:bg-sky-50 flex items-center px-3 py-1 rounded"
                                >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    {isEditing ? "Cancelar" : "Editar"}
                                </button>
                            </div>
                            <div className="space-y-4 p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-medium mb-1">Nome</label>
                                        <input
                                            {...register("nome")}
                                            placeholder="Seu nome"
                                            disabled={!isEditing}
                                            className="bg-white/50 w-full px-3 py-2 border rounded"
                                        />
                                        {getError("nome") && (
                                            <span className="text-red-500 text-xs">{getError("nome")}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Sobrenome</label>
                                        <input
                                            {...register("sobrenome")}
                                            placeholder="Seu sobrenome"
                                            disabled={!isEditing}
                                            className="bg-white/50 w-full px-3 py-2 border rounded"
                                        />
                                        {getError("sobrenome") && (
                                            <span className="text-red-500 text-xs">{getError("sobrenome")}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-medium mb-1">Email</label>
                                        <input
                                            {...register("email")}
                                            type="email"
                                            placeholder="seu@email.com"
                                            disabled={!isEditing}
                                            className="bg-white/50 w-full px-3 py-2 border rounded"
                                        />
                                        {getError("email") && (
                                            <span className="text-red-500 text-xs">{getError("email")}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Telefone</label>
                                        <input
                                            {...register("telefone")}
                                            placeholder="(11) 99999-9999"
                                            disabled={!isEditing}
                                            className="bg-white/50 w-full px-3 py-2 border rounded"
                                        />
                                        {getError("telefone") && (
                                            <span className="text-red-500 text-xs">{getError("telefone")}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Endereço */}
                        <div className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <div className="p-4">
                                <div className="text-xl font-serif text-slate-800 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-sky-600" />
                                    Endereço de Entrega
                                </div>
                                <div className="text-slate-500 text-sm">
                                    Endereço onde seus pedidos serão entregues
                                </div>
                            </div>
                            <div className="space-y-4 p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block font-medium mb-1">Rua</label>
                                        <input
                                            {...register("endereco.rua")}
                                            placeholder="Nome da rua"
                                            disabled={!isEditing}
                                            className="bg-white/50 w-full px-3 py-2 border rounded"
                                        />
                                        {getError("endereco.rua") && (
                                            <span className="text-red-500 text-xs">{getError("endereco.rua")}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Número</label>
                                        <input
                                            {...register("endereco.numero")}
                                            placeholder="123"
                                            disabled={!isEditing}
                                            className="bg-white/50 w-full px-3 py-2 border rounded"
                                        />
                                        {getError("endereco.numero") && (
                                            <span className="text-red-500 text-xs">{getError("endereco.numero")}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-medium mb-1">Complemento (opcional)</label>
                                        <input
                                            {...register("endereco.complemento")}
                                            placeholder="Apto, casa, etc."
                                            disabled={!isEditing}
                                            className="bg-white/50 w-full px-3 py-2 border rounded"
                                        />
                                        {getError("endereco.complemento") && (
                                            <span className="text-red-500 text-xs">{getError("endereco.complemento")}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Bairro</label>
                                        <input
                                            {...register("endereco.bairro")}
                                            placeholder="Nome do bairro"
                                            disabled={!isEditing}
                                            className="bg-white/50 w-full px-3 py-2 border rounded"
                                        />
                                        {getError("endereco.bairro") && (
                                            <span className="text-red-500 text-xs">{getError("endereco.bairro")}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block font-medium mb-1">Cidade</label>
                                        <input
                                            {...register("endereco.cidade")}
                                            placeholder="Sua cidade"
                                            disabled={!isEditing}
                                            className="bg-white/50 w-full px-3 py-2 border rounded"
                                        />
                                        {getError("endereco.cidade") && (
                                            <span className="text-red-500 text-xs">{getError("endereco.cidade")}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Estado</label>
                                        <input
                                            {...register("endereco.estado")}
                                            placeholder="SP"
                                            disabled={!isEditing}
                                            className="bg-white/50 w-full px-3 py-2 border rounded"
                                        />
                                        {getError("endereco.estado") && (
                                            <span className="text-red-500 text-xs">{getError("endereco.estado")}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">CEP</label>
                                        <input
                                            {...register("endereco.cep")}
                                            placeholder="00000-000"
                                            disabled={!isEditing}
                                            className="bg-white/50 w-full px-3 py-2 border rounded"
                                        />
                                        {getError("endereco.cep") && (
                                            <span className="text-red-500 text-xs">{getError("endereco.cep")}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botão de Salvar */}
                        {isEditing && (
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-sky-600 hover:bg-sky-700 px-8 py-3 flex items-center text-white rounded"
                                    disabled={formState.isSubmitting}
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {formState.isSubmitting ? "Salvando..." : "Salvar Informações"}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
