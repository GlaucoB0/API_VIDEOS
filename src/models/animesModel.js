import conn from "../config/conn.js";

const tableAnimes = /*sql*/`
    CREATE TABLE IF NOT EXISTS animes(
        id_anime VARCHAR(255) PRIMARY KEY NOT NULL,
        nome VARCHAR(255) NOT NULL,
        sinopse VARCHAR(2000) NOT NULL,
        foto_capa VARCHAR(255) NOT NULL,
        ano_lancamento YEAR(4) NOT NULL,
        generos VARCHAR(255) NOT NULL,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    );
`
conn.query(tableAnimes, (err, result, field) => {
    if (err) {
      console.error("erro ao criar a tabela" + err.stack);
      return;
    }
  
    console.log("Tabela [Animes] criada com sucesso!");
  });