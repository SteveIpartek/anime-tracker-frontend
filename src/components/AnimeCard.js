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

  return (
    <div className="anime-card">
      <img src={`http://localhost:5000/${anime.imagen.replace(/\\/g, '/')}`} alt={anime.titulo} />
      <h3>{anime.titulo}</h3>
      
      <div className="card-info">
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
  );
}

export default AnimeCard;