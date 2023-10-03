const { contas } = require('../bancodedados')

function verificarCampos (req, res, next) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório.' });
    }

    if (!cpf || cpf.length !== 11) {
        return res.status(400).json({ mensagem: 'O cpf é obrigatorio.' });
    }

    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento é obrigatória.' });
    }

    if (!telefone) {
        return res.status(400).json({ mensagem: 'O telefone é obrigatório.' });
    }

    if (!email) {
        return res.status(400).json({ mensagem: 'O email é obrigatório.' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória.' });
    }
    next();
}

function emailCpfExiste (req, res, next) {
    const { cpf, email } = req.body;
    const cpfExistente = contas.find(conta => conta.cpf === cpf);
    const emailExistente = contas.find(conta => conta.email === email);

    if (cpfExistente) {
        return res.status(400).json({ mensagem: 'O CPF informado já existe cadastrado!' });
    }
    if (emailExistente) {
        return res.status(400).json({ mensagem: 'O email informado já existe cadastrado!' });
    }
    next();
}

module.exports = {
    verificarCampos,
    emailCpfExiste
}