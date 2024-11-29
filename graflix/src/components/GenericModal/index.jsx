import React from "react";
import GraphViewer from "../GraphViewer";
import "./styles.css";

const GenericModal = ({
  movie,
  width,
  height,
  title,
  open,
  setIsOpen,
  handleWatchFilm,
  currentUser,
  graphData,
}) => {
  if (!open) return null; // Retorna nulo quando o modal está fechado

  const isWatchedByCurrentUser = movie.watched.includes(currentUser); // Verifica se o usuário assistiu

  console.log(isWatchedByCurrentUser);
  console.log(movie);
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
          <div className="modal-body-movie">
            <div className="modal-body-movie-content">
              <img
                src={require(`../../img/${movie.capa}`)}
                alt={movie.titulo}
                className="modal-movie-image"
              />
              <div className="modal-movie-details">
                <h3>{movie.titulo}</h3>
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
                <p>
                  <strong>Classificação Indicativa:</strong>{" "}
                  {movie.classificacao_indicativa}
                </p>
              </div>
            </div>
            <div className="modal-body-movie-buttons">
              <button
                className={
                  isWatchedByCurrentUser
                    ? "modal-body-movie-button-check"
                    : "modal-body-movie-button-nocheck"
                }
                onClick={() => handleWatchFilm(movie.id)}
              >
                {isWatchedByCurrentUser ? "Já assisti" : "Não Assistido"}
              </button>
            </div>
          </div>
          <div className="modal-body-graph">
            teste
            <GraphViewer graphData={graphData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
