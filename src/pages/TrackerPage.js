import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnimes, addAnime, deleteAnime, updateAnime } from '../services/api';
import AnimeList from '../components/AnimeList';
import AnimeForm from '../components/AnimeForm';

function TrackerPage() {
  const [animes, setAnimes] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async () => {
    try {
      const { data } = await getAnimes();
      setAnimes(data);
    } catch (error) {
      console.log('Error al cargar animes', error);
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
  };

  const handleAddAnime = async (formData) => {
    try {
      const { data } = await addAnime(formData);
      setAnimes([data, ...animes]);
    } catch (error) {
      console.log('Error al añadir', error);
    }
  };

  const handleDeleteAnime = async (id) => {
    try {
      await deleteAnime(id);
      setAnimes(animes.filter(a => a._id !== id));
    } catch (error) {
      console.log('Error al borrar', error);
    }
  };

  const handleUpdateAnime = async (id, data) => {
    try {
      const { data: updatedAnime } = await updateAnime(id, data);
      setAnimes(animes.map(a => (a._id === id ? updatedAnime : a)));
    } catch (error) {
      console.log('Error al actualizar', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="tracker-page">
      <header>
        <h1>Mi Anime Tracker</h1>
        <div className="header-user">
          <span>Hola, {username}</span>
          <button onClick={logout} className="logout-btn">Salir</button>
        </div>
      </header>
      <AnimeForm onAddAnime={handleAddAnime} />
      <AnimeList 
        animes={animes} 
        onDelete={handleDeleteAnime} 
        onUpdate={handleUpdateAnime} 
      />
    </div>
  );
}

export default TrackerPage;