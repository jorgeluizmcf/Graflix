import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

const Graph = ({ elements }) => {
  const containerRef = useRef(null); // Referência para o contêiner do grafo

  useEffect(() => {
    if (containerRef.current) {
      cytoscape({
        container: containerRef.current, // Contêiner do grafo
        elements, // Nós e arestas fornecidos como props
        style: [ // Estilos dos nós e arestas
          {
            selector: "node",
            style: {
              "background-color": "#0074D9",
              label: "data(label)",
              color: "#fff",
              "text-valign": "center",
              "text-halign": "center",
              "font-size": "12px",
            },
          },
          {
            selector: "edge",
            style: {
              width: 2,
              "line-color": "#2ECC40",
              "target-arrow-color": "#2ECC40",
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
            },
          },
        ],
        layout: {
          name: "breadthfirst", // Layout do grafo (ajuste conforme necessário)
          directed: true,
          padding: 10,
        },
      });
    }
  }, [elements]);

  return <div ref={containerRef} style={{ width: "100%", height: "500px" }} />;
};

export default Graph;
