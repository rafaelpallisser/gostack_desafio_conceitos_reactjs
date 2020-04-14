import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get('repositories');

      setRepositories(response.data);
    }

    getRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio Node.js ${Date.now()}`,
      url: 'https://github.com/rafaelpallisser/gostack_desafio_conceitos_nodejs',
      techs: ["ReactJS"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const resp = await api.delete(`repositories/${id}`);

    console.log('resp: ', resp);

    if (resp.status === 204) {
      const newRepositories = repositories.filter(repository => repository.id !== id);

      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
