import { useEffect } from "react";

const Kosaraju = ({
  movies,
  watchedMovies,
  loggedUser,
  setRecommendedMovies,
  setGraphData,
}) => {
  // Função para calcular os pesos entre os filmes com base em propriedades em comum
  const calculateWeights = (movies) => {
    const graph = new Map();
    movies.forEach((movieA) => {
      movies.forEach((movieB) => {
        if (movieA.id !== movieB.id) {
          let weight = 0;
          if (movieA.genero === movieB.genero) weight += 4; // Mais peso para gênero
          if (movieA.classificacao === movieB.classificacao) weight += 3;
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

  // Algoritmo de Kosaraju para encontrar componentes fortemente conectados
  const kosaraju = (graph) => {
    const stack = [];
    const visited = new Set();

    // Passo 1: Ordenação topológica
    const dfs1 = (node) => {
      visited.add(node);
      for (const edge of graph.get(node) || []) {
        if (!visited.has(edge.target)) dfs1(edge.target);
      }
      stack.push(node);
    };

    for (const node of graph.keys()) {
      if (!visited.has(node)) dfs1(node);
    }

    // Passo 2: Transpor o grafo
    const transposedGraph = new Map();
    for (const [node, edges] of graph.entries()) {
      edges.forEach((edge) => {
        if (!transposedGraph.has(edge.target))
          transposedGraph.set(edge.target, []);
        transposedGraph.get(edge.target).push(node);
      });
    }

    // Passo 3: Identificar SCCs
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

  // Converte o grafo em uma matriz de adjacência
  const graphToMatrix = (graph) => {
    const nodes = Array.from(graph.keys());
    const size = nodes.length;
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));

    nodes.forEach((node, i) => {
      (graph.get(node) || []).forEach((edge) => {
        const j = nodes.indexOf(edge.target);
        if (j !== -1) matrix[i][j] = edge.weight;
      });
    });

    return { matrix, nodes };
  };

  // UseEffect para calcular grafo, SCCs, recomendações e dados para visualização
  useEffect(() => {
    if (!movies || !Array.isArray(movies) || movies.length === 0) {
      console.warn("Movies is invalid or empty:", movies);
      return;
    }

    if (!loggedUser) {
      console.warn("LoggedUser is undefined");
      return;
    }

    const graph = calculateWeights(movies);
    const scc = kosaraju(graph);

    // Determinar recomendações
    const recommendedMovies = [];
    scc.forEach((component) => {
      component.forEach((movieId) => {
        if (
          !watchedMovies.some((movie) => movie.id === movieId) &&
          !recommendedMovies.some((movie) => movie.id === movieId)
        ) {
          const recommendedMovie = movies.find((movie) => movie.id === movieId);
          if (recommendedMovie) recommendedMovies.push(recommendedMovie);
        }
      });
    });

    setRecommendedMovies(recommendedMovies);

    // Gerar matriz de adjacências para o grafo
    const { matrix, nodes } = graphToMatrix(graph);
    setGraphData({ matrix, nodes });
  }, [movies, watchedMovies, loggedUser, setRecommendedMovies, setGraphData]);

  return null; // Não renderiza nada diretamente
};

export default Kosaraju;
