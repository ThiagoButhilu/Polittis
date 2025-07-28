import { User } from "../../components/User/User"

const users: User[] = [
    new User({
        id: 0,
        nome: 'Alice',
        sobrenome: 'Silva',
        email: 'alice.silva@example.com',
        telefone: 233311112323,
        endereco: {
            rua: 'Rua das Flores',
            numero: '123',
            complemento: 'Apto 101',
            bairro: 'Centro',
            cidade: 'São Paulo',
            estado: 'SP',
            cep: '01001-000'
        }
    }),
    new User({
        id: 1,
        nome: 'Bruno',
        sobrenome: 'Costa',
        email: 'bruno.costa@example.com',
        telefone: 232323233222,
        endereco: {
            rua: 'Avenida Brasil',
            numero: '456',
            complemento: '',
            bairro: 'Copacabana',
            cidade: 'Rio de Janeiro',
            estado: 'RJ',
            cep: '22040-002'
        }
    }),
    new User({
        id: 2,
        nome: 'Carla',
        sobrenome: 'Souza',
        email: 'carla.souza@example.com',
        telefone: 232323232323,
        endereco: {
            rua: 'Rua das Palmeiras',
            numero: '789',
            complemento: 'Casa',
            bairro: 'Savassi',
            cidade: 'Belo Horizonte',
            estado: 'MG',
            cep: '30140-120'
        }
    }),
    new User({
        id: 3,
        nome: 'Maria',
        sobrenome: 'Eduarda',
        email: 'Eduarda+Thiago=LoveForever@example.com',
        telefone: 1195059499303,
        endereco: {
            rua: 'Rua das Palmeiras',
            numero: '789',
            complemento: 'Casa',
            bairro: 'Savassi',
            cidade: 'Belo Horizonte',
            estado: 'MG',
            cep: '30140-120'
        }
    }),
    new User({
        id: 4,
        nome: 'Sabrina',
        sobrenome: 'Carpeanter',
        email: 'Brininha@example.com',
        telefone: 1195059499303,
        endereco: {
            rua: 'Rua das Palmeiras',
            numero: '789',
            complemento: 'Casa',
            bairro: 'Savassi',
            cidade: 'Belo Horizonte',
            estado: 'MG',
            cep: '30140-120'
        }
    }),
];

export default users;