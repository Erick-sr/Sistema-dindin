const { values } = require("lodash");
const pool = require("../conexao");

const listarcategorias = async (req, res) => {
    try {
        const { rows } = await pool.query("select * from categorias");

        return res.json(rows);
    } catch (error) {
        return res.status(500).json("Erro interno do servidor");
    }
};

const listartransacao = async (req, res) => {
    try {
        const { rows } = await pool.query("select * from transacoes");

        return res.json(rows);
    } catch (error) {
        return res.status(500).json("Erro interno do servidor");
    }
};

const detalhartransacao = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows, rowCount } = await pool.query(
            "select * from transacoes where id = $1",
            [id]
        );
        if (rowCount < 1) {
            return res
                .status(404)
                .json({ mensagem: "Transação não encontrado" });
        }
        return res.json(rows[0]);
    } catch (error) {
        return res.status(500).json("Erro interno do servidor");
    }
};

const cadastrartransacao = async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body;

    try {
        const { rows } = await pool.query(
            "insert into transacoes (tipo, descricao, valor, data, categoria_id) values ($1, $2, $3, $4, $5) returning *",
            [tipo, descricao, valor, data, categoria_id]
        );
        return res.status(201).json(rows);
    } catch (error) {
        return res.status(500).json("Erro interno do servidor");
    }
};

const atualizartransacao = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        const { rows, rowCount } = await pool.query(
            "select * from transacoes where id = $1",
            [id]
        );

        if (rowCount < 1) {
            return res
                .status(404)
                .json({ mensagem: "transação não encontrada" });
        } else {
            await pool.query(
                "update transacoes  set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6",
                [descricao, valor, data, categoria_id, tipo, id]
            );
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json("Erro interno do servidor");
    }
};

const excluirtransacao = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows, rowCount } = await pool.query(
            "select * from transacoes where id = $1",
            [id]
        );
        console.log(rows, rowCount);
        if (rowCount < 1) {
            return res
                .status(404)
                .json({ mensagem: "transação não encontrada" });
        } else {
            await pool.query("delete from transacoes where id = $1", [id]);
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json("Erro interno do servidor");
    }
};

const extratotransacao = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "select tipo, sum(valor) from transacoes group by tipo"
        );

        const a = {
            entrada: Number(rows[0].sum),
            saida: Number(rows[1].sum),
        };
        return res.json(a);
    } catch (error) {
        return res.status(500).json("Erro interno do servidor");
    }
};

module.exports = {
    listarcategorias,
    listartransacao,
    cadastrartransacao,
    detalhartransacao,
    atualizartransacao,
    excluirtransacao,
    extratotransacao,
};
