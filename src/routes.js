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
//http://localhost:3000/contas
rotas.post('/contas', verificarCampos, emailCpfExiste, criarConta);
//http:/localhost:3000/contas/:numeroConta/usuario
rotas.put('/contas/:numeroConta/usuario', verificarCampos, emailCpfExiste, verificarNumeroContaParams, verificarContaParams, atualizarUsuario);
//http://localhost:3000/:numeroConta
rotas.delete('/contas/:numeroConta',verificarContaParams, excluirConta);

//http://localhost:3000/contas/saldo/numero_conta
rotas.get('/contas/saldo', verificarNumeroContaQuery, verificarSenhaQuery, saldo);
//http://localhost:3000/contas/extrato?numero_conta
rotas.get('/contas/extrato',verificarNumeroContaQuery, verificarSenhaQuery, extrato);

//http://localhost:3000/transacoes/depositar
rotas.post('/transacoes/depositar', depositar);
//http://localhost:3000/transacoes/sacar
rotas.post('/transacoes/sacar', sacar);
//http://localhost:3000/transacoes/transferir
rotas.post('/transacoes/transferir', transferir);

module.exports = rotas;
