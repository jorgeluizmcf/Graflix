import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import "./styles.css"; // Importação do CSS externo

const GraphViewer = ({ elements, adjacencyMatrix }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let cy;

    if (containerRef.current) {
      console.log('Iniciando o Cytoscape...');
      cy = cytoscape({
        container: containerRef.current,
        elements,
        style: [
          {
            selector: "node",
            style: {
              "background-color": "#0074D9",
              label: "data(label)",
              color: "#fff",
              "text-valign": "center",
              "text-halign": "center",
              "font-size": "12px",
              "border-width": 2,
              "border-color": "#fff",
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
              label: "data(weight)",
              "font-size": "10px",
              color: "#2ECC40",
            },
          },
        ],
        layout: {
          name: "random", // Layout mais uniforme e distribuído
          animate: true,
          padding: 30,
        },
      });

      // Atualizando labels dos nós e pesos das arestas
      cy.nodes().forEach((node, index) => {
        node.data("label", String.fromCharCode(65 + index)); // Define labels como "A", "B", "C", etc.
      });

      cy.edges().forEach((edge) => {
        const sourceId = edge.source().id();
        const targetId = edge.target().id();
        const sourceIndex = sourceId.charCodeAt(0) - 65; // Converte "A" -> 0, "B" -> 1, etc.
        const targetIndex = targetId.charCodeAt(0) - 65;
        const weight = adjacencyMatrix[sourceIndex][targetIndex]; // Pega o peso da matriz de adjacências
        edge.data("weight", weight);
      });

      // Ajuste de zoom para centralizar o grafo
      cy.ready(() => {
        cy.fit(cy.elements(), 50); // Ajusta o zoom e centraliza o grafo
      });

      console.log('Cytoscape iniciado:', cy);

      cy.edges().forEach((edge) => {
        console.log("Edge data:", edge.data());
      });
    }

    return () => {
      if (cy) {
        cy.destroy();
      }
    };
  }, [elements, adjacencyMatrix]); // Recria o grafo quando `elements` ou `adjacencyMatrix` mudam

  return <div ref={containerRef} className="graph-container" />;
};

export default GraphViewer;
