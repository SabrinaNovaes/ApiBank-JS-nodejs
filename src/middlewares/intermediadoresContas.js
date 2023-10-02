const { contas } = require('../bancodedados');

function verificarNumeroContaParams (req, res, next) {
    const { numeroConta } = req.params;

    if (!numeroConta) {
        return res.status(400).json({ mensagem: 'Número da conta inválido.' });
    }
    next();
}

function verificarContaParams (req, res, next) {
    const { numeroConta } = req.params;
    const conta = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta bancaria não encontrada!' });
    }
    next();
}

module.exports ={
    verificarNumeroContaParams,
    verificarContaParams,
}