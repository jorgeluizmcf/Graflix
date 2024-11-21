import React, { useState } from "react";
import "./styles.css"; // Importar o CSS para estilização
import Logo from "../../img/logonetflix.png";

const TopBar = ({ search, setSearch, loggedUser, setLoggedUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar a visibilidade do dropdown
  const [selectedUser, setSelectedUser] = useState(loggedUser); // Estado para armazenar o usuário selecionado

  // Função para atualizar o valor da busca
  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Atualiza o valor da busca com o que foi digitado
  };

  // Função para abrir e fechar o dropdown de seleção de usuários
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Alterna o estado de visibilidade do dropdown
  };

  // Função para mudar o usuário selecionado
  const handleUserSelection = (user) => {
    setLoggedUser(user); // Atualiza o estado do usuário logado
    setSelectedUser(user); // Atualiza o usuário selecionado no estado
    setIsMenuOpen(false); // Fecha o dropdown após selecionar o usuário
  };

  return (
    <div className="top-bar">
      {/* Logo à esquerda */}
      <div className="top-bar-logo">
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>

      {/* Barra de pesquisa ao centro */}
      <div className="top-bar-search">
        <input
          type="text"
          placeholder="Buscar filmes..."
          className="search-input"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Exibição do nome do usuário logado */}
      <p>Olá, {selectedUser}!</p>

      {/* Dropdown para trocar perfil à direita */}
      <div className="top-bar-profile">
        <div className="dropdown">
          <button className="profile-button" onClick={toggleMenu}>
            Trocar Perfil
          </button>

          {/* Dropdown menu */}
          {isMenuOpen && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={() => handleUserSelection("Usuário 1")}>Usuário 1</li>
                <li onClick={() => handleUserSelection("Usuário 2")}>Usuário 2</li>
                <li onClick={() => handleUserSelection("Usuário 3")}>Usuário 3</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
