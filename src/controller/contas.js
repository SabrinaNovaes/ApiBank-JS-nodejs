const { contas, depositos, saques, transferencias } = require('../bancodedados')

let numero = 1;

const listarContas = (req, res) => {
    return res.status(200).json(contas);
}

const criarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {
        const conta = {
            numero: numero,
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha,
            saldo: 0
        }
        numero++;
        contas.push(conta);

        return res.status(201).json();
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

const atualizarUsuario = async (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {
        const conta = contas.find((conta) => {
            return conta.numero === Number(numeroConta);
        });

        conta.nome = nome;
        conta.cpf = cpf;
        conta.data_nascimento = data_nascimento;
        conta.telefone = telefone;
        conta.email = email;
        conta.senha = senha;

        return res.status(204).json();
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

const excluirConta = async (req, res) => {
    const { numeroConta } = req.params;

    try {
        const conta = contas.find((conta) => {
            return conta.numero === Number(numeroConta);
        });
    
        if (conta.saldo !== 0) {
            return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
        }
        const index = contas.indexOf(conta);
        contas.splice(index, 1);

        return res.status(204).json();
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

const saldo = async (req, res) => {
    const { numero_conta, senha } = req.query;

    try {
        const conta = contas.find((conta) => {
            return conta.numero === Number(numero_conta);
        });

        return res.status(200).json({ "saldo": conta.saldo });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const extrato = async (req, res) => {
    const { numero_conta, senha } = req.query;

    try {
        const conta = contas.find((conta) => {
            return conta.numero === Number(numero_conta);
        });
        
        const extrato = {
            depositos: depositos.filter((deposito) => {
                return Number(deposito.numero_conta) === Number(conta.numero);
            }),
            saques: saques.filter((saque) => {
                return Number(saque.numero_conta) === Number(conta.numero);
            }),
            transferenciasRecebida: transferencias.filter((transferencia) => {
                return Number(transferencia.numero_conta_destino) === Number(conta.numero);
            }),
            transferenciasOrigem: transferencias.filter((transferencia) => {
                return Number(transferencia.numero_conta_origem) === Number(conta.numero);
            })
        }
        return res.status(200).json(extrato);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    saldo,
    extrato
}