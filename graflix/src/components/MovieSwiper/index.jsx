import React, { useState } from "react";
import GenericModal from "../GenericModal/index.jsx"; // Componente do Modal
import "./styles.css"; // Estilos personalizados

const MovieSwiper = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null); // Estado para o filme selecionado
  const [modalOpen, setModalOpen] = useState(false); // Estado do modal (aberto ou fechado)

  // Função que abre o modal e define o filme selecionado
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  return (
    <div className="movie-swiper">
      {/* Exibe o swiper com filmes */}
      <div className="movie-swiper-container">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onClick={() => handleMovieClick(movie)}
          >
            <img src={movie.image} alt={movie.title} className="movie-image" />
          </div>
        ))}
      </div>

      {/* Componente Modal */}
      {modalOpen && selectedMovie && (
        <GenericModal
          movie={selectedMovie}
          title={selectedMovie.title}
          width={600}  // Largura do modal
          height={400} // Altura do modal
          open={modalOpen}
          setOpen={setModalOpen}
        />
      )}
    </div>
  );
};

export default MovieSwiper;
