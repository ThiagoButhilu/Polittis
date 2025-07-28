export class User {
    id: number = 0
    nome: string = "";
    sobrenome: string = "";
    email: string = "";
    telefone: number = 0;
    endereco: {
        rua: string;
        numero: string;
        complemento: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
    } = {
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: ""
    };

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}