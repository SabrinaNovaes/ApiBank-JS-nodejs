const { contas } = require('../bancodedados');

const depositar = async (req, res) => {
    const { numero_conta, valor } = req.body;
    const conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    if (!numero_conta || !valor) {
        return res.status(400).json({ menssagem: 'O número da conta e o valor são obrigatórios!' });
    }

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta não encontrada!" });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor do depósito deve ser maior que zero!" });
    }

    const deposito = {
        data: new Date().toLocaleString("pt-BR").replaceAll('/', '-'),
        numero_conta,
        valor
    };

    conta.saldo += valor;

    return res.status(201).json(deposito);
}

const sacar = async (req, res) => {
    const { numero_conta, valor, senha } = req.body;
    const conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, valor e a senha são obrigatórios!' });
    }

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta não encontrada!" });
    }

    if (conta.saldo <= 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor que zero!' });
    }

    const saque = {
        data: new Date().toLocaleString("pt-BR").replaceAll('/', '-'),
        numero_conta,
        valor,
        senha
    };

    conta.saldo -= valor;

    return res.status(201).json(saque);
}

const transferir = async (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    const contaOrigem = contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem);
    });
    const contaDestino = contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino);
    });
    const senhaOrigem = contas.find((conta) => {
        return conta.senha === senha;
    });

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    }

    if (senhaOrigem) { //CORRIGIR SENHA
        return res.status(401).json({ mensagem: 'Senha incorreta!' });
    }

    if (!contaOrigem || !contaDestino) {
        return res.status(404).json({ mensagem: 'Conta não encontrada!' });
    }

    if (contaOrigem.saldo < valor) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente!' });
    }

    const tranferencia = {
        numero_conta_origem,
        numero_conta_destino,
        valor,
        senha
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    return res.status(204).json(tranferencia);
}

module.exports = {
    depositar,
    sacar,
    transferir
}