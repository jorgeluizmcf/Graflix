import React from "react";
import "./styles.css";

const GenericModal = ({ 
  movie, 
  width, 
  height, 
  title, 
  isOpen, 
  setIsOpen 
}) => {
  if (!isOpen) return null; // Retorna nulo quando o modal está fechado

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
            src={movie.cover} 
            alt={movie.title} 
            className="modal-movie-image" 
          />
          <div className="modal-movie-details">
            <h3>{movie.title}</h3>
            <p><strong>Classificação:</strong> {movie.rating}</p>
            <p><strong>Gênero:</strong> {movie.genre}</p>
            <p><strong>Duração:</strong> {movie.duration} minutos</p>
            <p><strong>Ano:</strong> {movie.year}</p>
            <p><strong>Diretor:</strong> {movie.director}</p>
            <p><strong>Elenco:</strong> {movie.cast.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
