import React from "react";

const Kosaraju = ({ movies, watchedMovies, loggedUser, setRecommendedMovies }) => {
  // Calcula os pesos entre os filmes com base em propriedades em comum
  const calculateWeights = (movies) => {
    if (!Array.isArray(movies)) {
      console.error("Movies is not an array:", movies);
      return new Map();
    }
  
    const graph = new Map();
    movies.forEach((movieA) => {
      movies.forEach((movieB) => {
        if (movieA.id !== movieB.id) {
          let weight = 0;
          if (movieA.genero === movieB.genero) weight += 3;
          if (movieA.diretor === movieB.diretor) weight += 2;
          const commonActors = movieA.elenco.filter((actor) =>
            movieB.elenco.includes(actor)
          );
          weight += commonActors.length;
          if (!graph.has(movieA.id)) graph.set(movieA.id, []);
          graph.get(movieA.id).push({ target: movieB.id, weight });
        }
      });
    });
  
    return graph;
  };
  

  // Implementação do algoritmo de Kosaraju
  const kosaraju = (graph) => {
    // Passo 1: Ordenação topológica (DFS)
    const stack = [];
    const visited = new Set();

    const dfs1 = (node) => {
      visited.add(node);
      for (const edge of graph.get(node) || []) {
        if (!visited.has(edge.target)) dfs1(edge.target);
      }
      stack.push(node);
    };

    graph.forEach((_, node) => {
      if (!visited.has(node)) dfs1(node);
    });

    // Passo 2: Transposição do grafo
    const transposedGraph = new Map();
    graph.forEach((edges, node) => {
      edges.forEach((edge) => {
        if (!transposedGraph.has(edge.target))
          transposedGraph.set(edge.target, []);
        transposedGraph.get(edge.target).push(node);
      });
    });

    // Passo 3: Identificar componentes fortemente conectados
    const scc = [];
    visited.clear();

    const dfs2 = (node, component) => {
      visited.add(node);
      component.push(node);
      for (const neighbor of transposedGraph.get(node) || []) {
        if (!visited.has(neighbor)) dfs2(neighbor, component);
      }
    };

    while (stack.length > 0) {
      const node = stack.pop();
      if (!visited.has(node)) {
        const component = [];
        dfs2(node, component);
        scc.push(component);
      }
    }

    return scc;
  };

  React.useEffect(() => {
    if (!movies || !Array.isArray(movies) || movies.length === 0) {
      console.warn("Movies is invalid or empty:", movies);
      return;
    }
    if (!watchedMovies || !Array.isArray(watchedMovies)) {
      console.warn("WatchedMovies is invalid:", watchedMovies);
      return;
    }
    if (!loggedUser) {
      console.warn("LoggedUser is undefined");
      return;
    }
  
    const graph = calculateWeights(movies);
    const scc = kosaraju(graph);
  
    const recommendations = [];
    scc.forEach((component) => {
      component.forEach((movieId) => {
        if (
          !watchedMovies.some((movie) => movie.id === movieId) &&
          !recommendations.some((movie) => movie.id === movieId)
        ) {
          const recommendedMovie = movies.find((movie) => movie.id === movieId);
          if (recommendedMovie) recommendations.push(recommendedMovie);
        }
      });
    });
  
    setRecommendedMovies(recommendations);
  }, [movies, watchedMovies, loggedUser]);
  

  return null; // Não renderiza nada na tela
};

export default Kosaraju;
