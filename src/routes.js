const express = require('express');
const { listarContas, criarConta, atualizarUsuario, excluirConta, saldo, extrato } = require('./controller/contas');
const { depositar, sacar, transferir } = require('./controller/transacoes');
const validarSenha = require('./middlewares/intermediarioValidarSenha');
const {  emailCpfExiste, verificarCampos } = require('./middlewares/intermediariosVerificarCampos');
const { verificarContaParams, verificarNumeroContaParams } = require('./middlewares/intermediadoresContas');
const { verificarNumeroContaQuery, verificarSenhaQuery } = require('./middlewares/intermediadoresTransacoes');

const rotas = express();

//http://localhost:3000/contas?senha_banco=Cubos123Bank
rotas.get('/contas', validarSenha, listarContas);
rotas.post('/contas', verificarCampos, emailCpfExiste, criarConta);
rotas.put('/contas/:numeroConta/usuario', verificarCampos, emailCpfExiste, verificarNumeroContaParams, verificarContaParams, atualizarUsuario);
rotas.delete('/contas/:numeroConta',verificarContaParams, excluirConta);

rotas.get('/contas/saldo', verificarNumeroContaQuery, verificarSenhaQuery, saldo);
rotas.get('/contas/extrato',verificarNumeroContaQuery, verificarSenhaQuery, extrato);

rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);

module.exports = rotas;
