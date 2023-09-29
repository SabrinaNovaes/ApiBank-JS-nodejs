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
        return res.status(400).json({ mensagem: 'Número da conta inválido.' });
    }

    const contaExistente = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if (!contaExistente) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }

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
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }

    if (conta.saldo !== 0) {
        return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }

    const index = contas.indexOf(conta);
    contas.splice(index, 1);

    return res.status(204).send();
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
    saldo,
    extrato
}