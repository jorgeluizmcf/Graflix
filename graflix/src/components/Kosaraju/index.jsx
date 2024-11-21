import React from "react";
import moviesData from "../../data/data.json"; // Importando o JSON de filmes

const Kosaraju = () => {
  // Função para verificar se dois filmes são "conectados" pelos critérios
  const areConnected = (movieA, movieB) => {
    return (
      movieA.classificacao_indicativa === movieB.classificacao_indicativa ||
      movieA.genero === movieB.genero ||
      movieA.ano_lancamento === movieB.ano_lancamento ||
      movieA.diretor === movieB.diretor ||
      movieA.elenco.some((actor) => movieB.elenco.includes(actor))
    );
  };

  // Construindo o grafo como uma lista de adjacência
  const buildGraph = (movies) => {
    const graph = {};
    movies.forEach((movie, i) => {
      graph[i] = [];
      movies.forEach((otherMovie, j) => {
        if (i !== j && areConnected(movie, otherMovie)) {
          graph[i].push(j); // Adiciona uma aresta direcionada
        }
      });
    });
    return graph;
  };

  // Transpor o grafo (inverter as arestas)
  const transposeGraph = (graph) => {
    const transposed = {};
    Object.keys(graph).forEach((key) => {
      transposed[key] = [];
    });
    Object.keys(graph).forEach((key) => {
      graph[key].forEach((neighbor) => {
        transposed[neighbor].push(parseInt(key));
      });
    });
    return transposed;
  };

  // Realizar busca em profundidade (DFS)
  const dfs = (graph, vertex, visited, stack = []) => {
    visited[vertex] = true;
    graph[vertex].forEach((neighbor) => {
      if (!visited[neighbor]) {
        dfs(graph, neighbor, visited, stack);
      }
    });
    stack.push(vertex);
  };

  // Encontrar os componentes fortemente conectados usando Kosaraju
  const kosarajuAlgorithm = (graph) => {
    const vertices = Object.keys(graph);
    const visited = {};
    const stack = [];

    // Passo 1: Preencher a pilha com a ordem de finalização
    vertices.forEach((vertex) => {
      if (!visited[vertex]) {
        dfs(graph, vertex, visited, stack);
      }
    });

    // Passo 2: Transpor o grafo
    const transposedGraph = transposeGraph(graph);

    // Passo 3: Fazer DFS no grafo transposto na ordem da pilha
    const visitedTransposed = {};
    const scc = []; // Componentes fortemente conectados

    while (stack.length > 0) {
      const vertex = stack.pop();
      if (!visitedTransposed[vertex]) {
        const component = [];
        dfs(transposedGraph, vertex, visitedTransposed, component);
        scc.push(component);
      }
    }

    return scc;
  };

  // Recomendação de filmes
  const recommendMovies = (movies, scc) => {
    const recommendations = {};
    scc.forEach((component) => {
      component.forEach((movieIndex) => {
        recommendations[movies[movieIndex].titulo] = component
          .filter((index) => index !== movieIndex) // Remove o próprio filme
          .slice(0, 2) // Até 2 vizinhos
          .map((index) => movies[index].titulo);
      });
    });
    return recommendations;
  };

  // Construir o grafo e aplicar Kosaraju
  const graph = buildGraph(moviesData);
  const stronglyConnectedComponents = kosarajuAlgorithm(graph);
  const recommendations = recommendMovies(moviesData, stronglyConnectedComponents);

  // Retornar o JSON com as recomendações
  return (
    <div>
      <h1>Recomendações de Filmes</h1>
      <pre>{JSON.stringify(recommendations, null, 2)}</pre>
    </div>
  );
};

export default Kosaraju;
