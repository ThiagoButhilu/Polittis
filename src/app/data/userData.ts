import { User } from "../../components/User/User"

const users: User[] = [
    new User({
        nome: 'Alice',
        sobrenome: 'Silva',
        email: 'alice.silva@example.com',
        telefone: '11999999999',
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
        nome: 'Bruno',
        sobrenome: 'Costa',
        email: 'bruno.costa@example.com',
        telefone: '21988888888',
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
        nome: 'Carla',
        sobrenome: 'Souza',
        email: 'carla.souza@example.com',
        telefone: '31977777777',
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