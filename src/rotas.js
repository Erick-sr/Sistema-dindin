const express = require("express");
const {
    listarcategorias,
    listartransacao,
    detalhartransacao,
    cadastrartransacao,
    atualizartransacao,
    excluirtransacao,
    extratotransacao,
} = require("./controladores/transacao");

const { cadastrarUsuario, login } = require("./controladores/usuarios");

const rotas = express();
rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

rotas.get("/categoria", listarcategorias);
rotas.get("/transacao", listartransacao);
rotas.get("/transacao/extrato", extratotransacao);
rotas.get("/transacao/:id", detalhartransacao);
rotas.post("/transacao", cadastrartransacao);
rotas.post("/transacao/:id", atualizartransacao);
rotas.delete("/transacao/:id", excluirtransacao);

module.exports = rotas;
