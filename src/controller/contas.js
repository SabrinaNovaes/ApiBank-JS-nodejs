const { contas } = require('../bancodedados');

let numero = 1;

const listarContas = (req, res) => {
    return res.status(200).json(contas);
}

const criarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

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
}

const atualizarUsuario = async (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!numeroConta) {
        return res.status(400).json({ mensagem: 'Numero da conta inválido.' });
    }

    const contaExistente = contas.find((conta) => {
        conta.numero === Number(numeroConta);
    });

    contaExistente.nome = nome;
    contaExistente.cpf = cpf;
    contaExistente.data_nascimento = data_nascimento;
    contaExistente.telefone = telefone;
    contaExistente.email = email;
    contaExistente.senha = senha;

    return res.status(204).send();
}

const excluirConta = async (req, res) => {
    const { numeroConta } = req.params;

    const conta = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if (!conta) {
        return res.status(404).json({ mensagem: 'Número da conta não encontrado' });
    }

    if (conta !== 0) {
        return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }
    return res.status(204).send();
}

const depositar = async (req, res) => {

}

const sacar = async (req, res) => {

}

const transferir = async (req, res) => {

}

const saldo = async (req, res) => {

}

const extrato = async (req, res) => {

}

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}