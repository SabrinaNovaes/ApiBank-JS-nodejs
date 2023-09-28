const { contas } = require('./bancodedados');

const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    if (senha_banco !== "Cubos123Bank") {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" });
    }

    next();
}

function verificarCampos (req, res, next) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório.' });
    }

    if (!cpf) {
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
module.exports ={
    validarSenha,
    verificarCampos,
    emailCpfExiste
}