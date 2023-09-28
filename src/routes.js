const express = require('express');
const { listarContas, criarConta, atualizarUsuario, excluirConta, depositar, sacar, transferir, saldo, extrato } = require('./controller/contas');
const { validarSenha, verificarCampos, emailCpfExiste } = require('./intermediadores');

const rotas = express();

//http://localhost:3000/contas?senha_banco=Cubos123Bank
rotas.get('/contas', validarSenha, listarContas);
rotas.post('/contas', verificarCampos, emailCpfExiste, criarConta);
rotas.put('/contas/:numeroConta/usuario', verificarCampos, emailCpfExiste, atualizarUsuario);
rotas.delete('/contas/:numeroConta', excluirConta);

rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/contas/saldo?numero_conta', saldo);
rotas.get('/contas/extrato?numero_conta', extrato);

module.exports = rotas;