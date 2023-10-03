const { contas } = require('../bancodedados')

function verificarNumeroContaQuery (req, res, next) {
    const { numero_conta } = req.query;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O número da conta é obrigatório!' });
    }
    next();
}

function verificarSenhaQuery (req, res, next) {
    const { numero_conta, senha } = req.query;
    const conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha da conta é obrigatórios!' });
    }

    if (conta.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta!" });
    }
    next();
}

module.exports = {
    verificarNumeroContaQuery,
    verificarSenhaQuery
}