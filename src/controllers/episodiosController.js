import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getEpisodios = (request, response) => {
    const sql = `SELECT * FROM episodios`;
    conn.query(sql, (err, data) => {
        if (err) {
            response.status(500).json({ msg: "Erro ao buscar episodios" });
            return;
        }
        const episodios = data;
        response.status(200).json(episodios);
    });
};

export const postEpisodio = (request, response) => {
    const { nome, sinopse, foto_capa, src_video, id_anime } = request.body; // tá recebendo as requisições

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
    if (!src_video) {
        response.status(400).json({ message: "O src_video é obrigatório!" });
        return;
    }
    if (!id_anime) {
        response.status(400).json({ message: "Os id_anime são obrigatórios!" });
        return;
    }

    // cadastrar um episodio -> antes preciso saber se esse episodio existe
    const checkSql = /*sql*/ `
    SELECT * FROM episodios 
    WHERE ?? = ? AND 
    ?? = ?
    `;
    const checkSqlData = [
        "nome",
        nome,
        "sinopse",
        sinopse
    ];

    conn.query(checkSql, checkSqlData, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao buscar os episodios" });
            return console.log(err);
        }
        if (data.length > 0) {
            // se for maior que 0 significa que já existe um episodio com essas informações
            response
                .status(409)
                .json({ message: "episodio já cadastrado na base de dados" }); // 409 - deu certo mas não esparava esses dados
            return console.log(err);
        }

        const id = uuidv4(); // passando o id aleatório através do uuid

        // agora vamos cadastrar as informações
        const insertSql = /*sql*/ `
      INSERT INTO episodios(??, ??, ??, ??, ??, ??) VALUES (?,?,?,?,?,?);
      `;

        const insertData = [
            "id_episodio",
            "nome",
            "sinopse",
            "foto_capa",
            "src_video",
            "id_anime",
            id,
            nome,
            sinopse,
            foto_capa,
            src_video,
            id_anime
        ];

        conn.query(insertSql, insertData, (err) => {
            if (err) {
                response.status(500).json({ message: "Erro ao cadastrar o episodio" });
                return console.log(err);
            }
            response.status(201).json({ message: "episodio cadastrado" });
        });
    });
};

export const buscarEpisodio = (request, response) => {
    const { id } = request.params;

    const sql = /*sql*/ `SELECT * FROM episodios WHERE ?? = ?`;
    const insertData = ["id_episodio", id];

    conn.query(sql, insertData, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ msg: "Erro ao  buscar episodio" });
            return;
        }
        if (data.length === 0) {
            response.status(404).json({ msg: "episodio não encontrado" });
            return;
        }
        response.status(200).json(data);
    });
};

export const editarEpisodio = (request, response) => {
    const { id } = request.params;
    const { nome, sinopse, foto_capa, src_video, id_anime } = request.body; // tá recebendo as requisições

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
    if (!src_video) {
        response.status(400).json({ message: "O src_video é obrigatório!" });
        return;
    }
    if (!id_anime) {
        response.status(400).json({ message: "Os id_anime são obrigatórios!" });
        return;
    }

    //consultas
    const checkSql = /*sql*/ `SELECT * FROM episodios WHERE ?? = ?`;
    const insertData = ["id_episodio", id];
    conn.query(checkSql, insertData, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ msg: "Erro ao buscar episodios" });
            return;
        }
        if (data.length === 0) {
            return response.status(404).json({ msg: "episodio não encontrado" });
        }

        //Consulta SQL para atualizar episodio
        const upadateSql = /*sql*/
            `
        UPDATE episodios SET
        ?? = ?, ?? = ?, ?? = ?, ?? = ?
        WHERE ?? = ?
      `;

        const checkSqlData = [
            "nome",
            nome,
            "sinopse",
            sinopse,
            "src_video",
            src_video,
            "id_anime",
            id_anime,
            "id_episodio",
            id,
        ];

        conn.query(upadateSql, checkSqlData, (err) => {
            if (err) {
                console.error(err);
                response.status(500).json({ msg: "Erro ao atualizar episodio" });
                return;
            }
            response.status(200).json({ msg: "episodio atualizado" });
        });
    });
};

export const deletarEpisodio = (request, response) => {
    const { id } = request.params; // pega o id que for passado na rota

    const deleteSql = /*sql*/ `delete from episodios where ?? = ?`;
    const insertData = ["id_episodio", id];

    conn.query(deleteSql, insertData, (err, info) => {
        if (err) {
            console.error(err);
            response.status(500).json({ message: "Erro ao deletar episodio" });
        }
        console.log(info);
        if (info.affectedRows === 0) {
            response.status(404).json({ messagae: "episodio não encontrado" });
            return;
        }

        response.status(200).json({ message: "episodio selecionado foi deletado" });
    });
};