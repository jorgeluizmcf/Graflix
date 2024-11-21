import { useState } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import MovieSwiper from './components/MovieSwiper';
import data from './data/data.json'
function App() {

  const [movies, setMovies] = useState(data);
  const [search, setSearch] = useState("");
  const [relationship, setRelationship] = useState(data);
  const [loggedUser, setLoggedUser] = useState("Usuário 1");
  

  return (
    <div className="App">
      <TopBar search={search} setSearch={setSearch} loggedUser={loggedUser} setLoggedUser={setLoggedUser}   />
      <p> {search} </p>
      <div className='movies-container'>
        <h1 className='movies-container-swiper-title'>Todos os Filmes</h1>
        <div className='movies-container-swiper'>
          <MovieSwiper movies={movies}/>
        </div>
        
      </div>

      
    </div>
  );
}

export default App;
