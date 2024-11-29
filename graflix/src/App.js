import { useState } from "react";
import "./App.css";
import TopBar from "./components/TopBar";
import MovieSwiper from "./components/MovieSwiper";
import Kosaraju from "./components/Kosaraju";
import data from "./data/data.json";
function App() {
  const [movies, setMovies] = useState(data); // Inicializa o estado com os filmes do JSON
  const [search, setSearch] = useState("");
  const [loggedUser, setLoggedUser] = useState("Usuário 1");
  const [graphData, setGraphData] = useState(null);

  // Estados para armazenar filmes assistidos e recomendados
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  // Atualiza a lista de filmes assistidos
  const handleWatchFilm = (movieId) => {
    setMovies((prevMovies) => {
      const updatedMovies = prevMovies.map((movie) => {
        if (movie.id === movieId) {
          return {
            ...movie,
            watched: movie.watched.includes(loggedUser)
              ? movie.watched.filter((user) => user !== loggedUser)
              : [...movie.watched, loggedUser],
          };
        }
        return movie;
      });

      // Atualizar a lista de filmes assistidos
      const updatedWatchedMovies = updatedMovies.filter((movie) =>
        movie.watched.includes(loggedUser)
      );
      setWatchedMovies(updatedWatchedMovies);
      return updatedMovies;
    });
  };

  // Função para filtrar filmes com base no search
  const filterMovies = (searchTerm) => {
    if (!searchTerm) return []; // Retorna uma lista vazia se não houver busca

    // Filtra os filmes que contenham o termo de busca no título, gênero, elenco ou diretor
    return data.filter((movie) => {
      const searchLower = searchTerm.toLowerCase(); // Para busca insensível a maiúsculas/minúsculas
      return (
        movie.titulo.toLowerCase().includes(searchLower) ||
        movie.genero.toLowerCase().includes(searchLower) ||
        movie.elenco.some((actor) =>
          actor.toLowerCase().includes(searchLower)
        ) ||
        movie.diretor.toLowerCase().includes(searchLower)
      );
    });
  };

  // Lista de filmes filtrados de acordo com o termo de busca
  const filteredMovies = filterMovies(search);

  const handleRecommendedMovie = (recomend) => {
    setRecommendedMovies(recomend);
  };

  return (
    <div className="App">
      <div>
        <Kosaraju
          movies={movies} // Certifique-se de que moviesData é um array
          watchedMovies={watchedMovies}
          loggedUser={loggedUser}
          setRecommendedMovies={setRecommendedMovies}
        />
      </div>
      <TopBar
        search={search}
        setSearch={setSearch}
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
      />
      {/* Se houver valor no search, exibe a seção "Resultados da Busca" */}
      {search && (
        <div className="movies-container">
          <h1 className="movies-container-swiper-title">
            {filteredMovies.length === 0
              ? "Não foi encontrado resultados..."
              : "Resultados da Busca"}
          </h1>
          <div className="movies-container-swiper">
            {filteredMovies.length === 0 ? (
              <h2 style={{ marginLeft: "32px" }}>Tente outra busca</h2>
            ) : (
              <MovieSwiper
                movies={filteredMovies}
                handleWatchFilm={handleWatchFilm}
              />
            )}
          </div>
        </div>
      )}
      {/* Se a lista de filmes assistidos estiver vazia, exibe a mensagem */}
      <div className="movies-container">
        <h1 className="movies-container-swiper-title">Já assistidos</h1>
        <div className="movies-container-swiper">
          {watchedMovies.length === 0 ? (
            <h2 style={{ marginLeft: "32px" }}>
              Você ainda não assistiu nenhum filme...
            </h2>
          ) : (
            <MovieSwiper
              movies={watchedMovies}
              handleWatchFilm={handleWatchFilm}
            />
          )}
        </div>
      </div>

      {/* Se a lista de filmes recomendados estiver vazia, exibe a mensagem */}
      <div className="movies-container">
        <h1 className="movies-container-swiper-title">Recomendados</h1>
        <div className="movies-container-swiper">
          {recommendedMovies.length === 0 ? (
            <h2 style={{ marginLeft: "32px" }}>
              Você ainda não tem nenhuma recomendação...
            </h2>
          ) : (
            <MovieSwiper
              movies={recommendedMovies}
              handleWatchFilm={handleWatchFilm}
            />
          )}
        </div>
      </div>
      <div className="movies-container">
        <h1 className="movies-container-swiper-title">Todos os Filmes</h1>
        <div className="movies-container-swiper">
          <MovieSwiper movies={movies} handleWatchFilm={handleWatchFilm} />
        </div>
      </div>
    </div>
  );
}

export default App;
