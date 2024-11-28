import React from "react";
import "./styles.css";

const GenericModal = ({ movie, width, height, title, open, setIsOpen }) => {
  if (!open) return null; // Retorna nulo quando o modal está fechado

  return (
    <div className="modal-overlay">
      <div
        className="modal-container"
        style={{ width: `${width}vw`, height: `${height}vh` }}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            className="modal-close-button"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>
        <div className="modal-body">
          <img
            src={require(`../../img/${movie.capa}`)}
            alt={movie.titulo}
            className="modal-movie-image"
          />
          <div className="modal-movie-details">
            <h3>{movie.title}</h3>
            <p>
              <strong>Gênero:</strong> {movie.genero}
            </p>
            <p>
              <strong>Sinopse:</strong> {movie.sinopse}
            </p>
            <p>
              <strong>Duração:</strong> {movie.tempo_duracao}
            </p>
            <p>
              <strong>Ano:</strong> {movie.ano_lancamento}
            </p>
            <p>
              <strong>Diretor:</strong> {movie.diretor}
            </p>
            <p>
              <strong>Elenco:</strong>{" "}
              {Array.isArray(movie.elenco) && movie.elenco.length > 0
                ? movie.elenco.join(", ")
                : "Não informado"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
