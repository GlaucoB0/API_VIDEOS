import conn from "../config/conn.js";

const tableEpisodios = /*sql*/`
    CREATE TABLE IF NOT EXISTS episodios(
        id_episodio VARCHAR(255) PRIMARY KEY NOT NULL,
        nome VARCHAR(255) NOT NULL,
        sinopse VARCHAR(2000) NOT NULL,
        foto_capa VARCHAR(255) NOT NULL,
        src_video VARCHAR(255) NOT NULL,
        id_anime VARCHAR(255) NOT NULL,
        foreign key (id_anime) references animes(id_anime),
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    );
`
conn.query(tableEpisodios, (err, result, field) => {
    if (err) {
      console.error("erro ao criar a tabela" + err.stack);
      return;
    }
  
    console.log("Tabela [Episodios] criada com sucesso!");
});