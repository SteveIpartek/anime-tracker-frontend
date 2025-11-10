import React, { useState } from 'react';

function AnimeCard({ anime, onDelete, onUpdate }) {
  const [comentarios, setComentarios] = useState(anime.comentarios);
  const [estado, setEstado] = useState(anime.estado);

  const handleEstadoChange = (e) => {
    const newState = e.target.value;
    setEstado(newState);
    onUpdate(anime._id, { estado: newState });
  };

  const handleComentariosBlur = () => {
    onUpdate(anime._id, { comentarios: comentarios });
  };

  const renderStars = (rating) => {
    const numRating = parseFloat(rating) || 0;
    if (numRating === 0) {
      return <span className="stars-empty">Sin Valorar</span>;
    }

    let stars = [];
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="stars-filled">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="stars-filled">★</span>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="stars-empty">☆</span>);
    }
    
    if (hasHalfStar) {
        stars[stars.length - 1 - emptyStars] = (
          <span key="half" className="star-half">
            <span className="stars-filled">★</span>
            <span className="stars-empty">☆</span>
          </span>
        );
    }

    return <>{stars} <span className="rating-number">({numRating})</span></>;
  };

  return (
    <div className="anime-card">
      <img 
        src={`http://localhost:5000/${anime.imagen.replace(/\\/g, '/')}`} 
        alt={anime.titulo} 
      />
      
      <div className="anime-card-content">
        <h3>{anime.titulo}</h3>
        
        <div className="card-info">
          <p><strong>Puntuación:</strong> {renderStars(anime.puntuacion)}</p>
          <p><strong>Género:</strong> {anime.genero || 'N/A'}</p>
          <p><strong>Episodios:</strong> {anime.episodios}</p>
          <p><strong>Temporadas:</strong> {anime.temporadas}</p>
          <p><strong>OVAs:</strong> {anime.ovas > 0 ? 'Sí' : 'No'}</p>
          <p><strong>Películas:</strong> {anime.peliculas > 0 ? 'Sí' : 'No'}</p>
        </div>

        <div className="card-controls">
          <label>Mi Estado:</label>
          <select value={estado} onChange={handleEstadoChange}>
            <option value="Pendiente">Pendiente</option>
            <option value="Viendo">Viendo</option>
            <option value="Completado">Completado</option>
          </select>
          
          <label>Mis Comentarios:</label>
          <textarea 
            className="comentarios-edit"
            placeholder="Escribe tus notas..."
            value={comentarios} 
            onChange={(e) => setComentarios(e.target.value)}
            onBlur={handleComentariosBlur}
          ></textarea>
          
          <button onClick={() => onDelete(anime._id)} className="delete-btn">
            Borrar de mi lista
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;