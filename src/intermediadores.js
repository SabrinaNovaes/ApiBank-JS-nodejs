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

function verificarNumeroConta (req, res, next) {
    const { numeroConta } = req.params;

    if (!numeroConta) {
        return res.status(400).json({ mensagem: 'Número da conta inválido.' });
    }
    next();
}

function verificarConta (req, res, next) {
    const { numeroConta } = req.params;
    const conta = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta bancaria não encontrada!' });
    }
    next();
}

function verificarNumero_conta (req, res, next) {
    const { numero_conta } = req.query;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O número da conta é obrigatórios!' });
    }
    next();
}

function verificarSenha (req, res, next) {
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

module.exports ={
    validarSenha,
    verificarCampos,
    emailCpfExiste,
    verificarNumeroConta,
    verificarConta,
    verificarNumero_conta,
    verificarSenha
}