import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getAnimes = (request, response) => {
    const sql = `SELECT * FROM animes`;
    conn.query(sql, (err, data) => {
        if (err) {
            response.status(500).json({ msg: "Erro ao buscar animes" });
            return;
        }
        const animes = data;
        response.status(200).json(animes);
    });
};

export const postAnime = (request, response) => {
    const { nome, sinopse, foto_capa, ano_lancamento, generos } = request.body; // tá recebendo as requisições

    // validação
    // vai ser um if para cada umas das informações, para garantir que não venham vazios
    if (!nome) {
        response.status(400).json({ message: "O nome é obrigatório!" });
        return;
    }
    if (!sinopse) {
        response.status(400).json({ message: "a sinopse é obrigatório!" });
        return;
    }
    if (!foto_capa) {
        response
            .status(400)
            .json({ message: "a foto_capa é obrigatório!" });
        return;
    }
    if (!ano_lancamento) {
        response.status(400).json({ message: "O ano_lancamento é obrigatório!" });
        return;
    }
    if (!generos) {
        response.status(400).json({ message: "Os generos são obrigatórios!" });
        return;
    }

    // cadastrar um anime -> antes preciso saber se esse anime existe
    const checkSql = /*sql*/ `
    SELECT * FROM animes 
    WHERE ?? = ? AND 
    ?? = ? AND 
    ?? = ?
    `;
    const checkSqlData = [
        "nome",
        nome,
        "sinopse",
        sinopse,
        "ano_lancamento",
        ano_lancamento,
    ];

    conn.query(checkSql, checkSqlData, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao buscar os animes" });
            return console.log(err);
        }
        if (data.length > 0) {
            // se for maior que 0 significa que já existe um anime com essas informações
            response
                .status(409)
                .json({ message: "anime já cadastrado na base de dados" }); // 409 - deu certo mas não esparava esses dados
            return console.log(err);
        }

        const id = uuidv4(); // passando o id aleatório através do uuid

        // agora vamos cadastrar as informações
        const insertSql = /*sql*/ `
      INSERT INTO animes(??, ??, ??, ??, ??, ??) VALUES (?,?,?,?,?,?);
      `;

        const insertData = [
            "id_anime",
            "nome", 
            "sinopse", 
            "foto_capa", 
            "ano_lancamento", 
            "generos",
            id, 
            nome, 
            sinopse, 
            foto_capa, 
            ano_lancamento, 
            generos,
        ];

        conn.query(insertSql, insertData, (err) => {
            if (err) {
                response.status(500).json({ message: "Erro ao cadastrar o anime" });
                return console.log(err);
            }
            response.status(201).json({ message: "anime cadastrado" });
        });
    });
};

export const buscarAnime = (request, response) => {
    const { id } = request.params;

    const sql = /*sql*/ `SELECT * FROM animes WHERE ?? = ?`;
    const insertData = ["id_anime", id];

    conn.query(sql, insertData, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ msg: "Erro ao  buscar anime" });
            return;
        }
        if (data.length === 0) {
            response.status(404).json({ msg: "anime não encontrado" });
            return;
        }
        response.status(200).json(data);
    });
};

export const editarAnime = (request, response) => {
    const { id } = request.params;
    const { nome, sinopse, foto_capa, ano_lancamento, generos } = request.body; // tá recebendo as requisições

    // validação
    // vai ser um if para cada umas das informações, para garantir que não venham vazios
    if (!nome) {
        response.status(400).json({ message: "O nome é obrigatório!" });
        return;
    }
    if (!sinopse) {
        response.status(400).json({ message: "a sinopse é obrigatório!" });
        return;
    }
    if (!foto_capa) {
        response
            .status(400)
            .json({ message: "a foto_capa é obrigatório!" });
        return;
    }
    if (!ano_lancamento) {
        response.status(400).json({ message: "O ano_lancamento é obrigatório!" });
        return;
    }
    if (!generos) {
        response.status(400).json({ message: "Os generos são obrigatórios!" });
        return;
    }

    //consultas
    const checkSql = /*sql*/ `SELECT * FROM animes WHERE ?? = ?`;
    const insertData = ["id_anime", id];
    conn.query(checkSql, insertData, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ msg: "Erro ao buscar animes" });
            return;
        }
        if (data.length === 0) {
            return response.status(404).json({ msg: "anime não encontrado" });
        }

        //Consulta SQL para atualizar anime
        const upadateSql = /*sql*/ `UPDATE animes SET
      ?? = ?, ?? = ?, ?? = ?
      WHERE ?? = ?`;

        const checkSqlData = [
            "nome",
            nome,
            "sinopse",
            sinopse,
            "ano_lancamento",
            ano_lancamento,
            "id_anime",
            id,
        ];

        conn.query(upadateSql, checkSqlData, (err) => {
            if (err) {
                console.error(err);
                response.status(500).json({ msg: "Erro ao atualizar anime" });
                return;
            }
            response.status(200).json({ msg: "anime atualizado" });
        });
    });
};

export const deletarAnime = (request, response) => {
    const { id } = request.params; // pega o id que for passado na rota

    const deleteSql = /*sql*/ `delete from animes where ?? = ?`;
    const insertData = ["id_anime", id];

    conn.query(deleteSql, insertData, (err, info) => {
        if (err) {
            console.error(err);
            response.status(500).json({ message: "Erro ao deletar anime" });
        }
        console.log(info);
        if (info.affectedRows === 0) {
            response.status(404).json({ messagae: "anime não encontrado" });
            return;
        }

        response.status(200).json({ message: "anime selecionado foi deletado" });
    });
};