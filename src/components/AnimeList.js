import React from 'react';
import AnimeCard from './AnimeCard';

function AnimeList({ animes, onDelete, onUpdate }) {
  if (animes.length === 0) {
    return <p className="empty-message">Tu lista está vacía. ¡Añade tu primer anime!</p>;
  }

  return (
    <div className="anime-list">
      {animes.map(anime => (
        <AnimeCard 
          key={anime._id} 
          anime={anime} 
          onDelete={onDelete} 
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default AnimeList;