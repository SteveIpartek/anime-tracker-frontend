import React, { useState } from 'react';

function AnimeForm({ onAddAnime }) {
  const [data, setData] = useState({
    titulo: '',
    estado: 'Pendiente',
    episodios: '0',
    temporadas: '0',
    genero: '',
    comentarios: '',
    puntuacion: '0',
    temporadaActual: '0',
    episodioActual: '0'
  });
  const [imagen, setImagen] = useState(null);
  const [tieneOvas, setTieneOvas] = useState(false);
  const [tienePeliculas, setTienePeliculas] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.titulo || !imagen) {
      alert('Título e imagen son requeridos.');
      return;
    }

    let finalData = { ...data };
    if (data.estado !== 'Viendo') {
      finalData.temporadaActual = '0';
      finalData.episodioActual = '0';
    } else {
      if (parseInt(data.temporadaActual) <= 0 || parseInt(data.episodioActual) <= 0) {
        alert('Si estás "Viendo" la serie, debes indicar tu progreso actual (Temporada y Episodio > 0).');
        return;
      }
    }
    
    const formData = new FormData();
    formData.append('imagen', imagen);
    
    for (const key in finalData) {
      formData.append(key, finalData[key]);
    }
    formData.append('ovas', tieneOvas ? 1 : 0);
    formData.append('peliculas', tienePeliculas ? 1 : 0);

    onAddAnime(formData);

    setData({
      titulo: '', estado: 'Pendiente', episodios: '0', temporadas: '0',
      genero: '', comentarios: '', puntuacion: '0', temporadaActual: '0', episodioActual: '0'
    });
    setTieneOvas(false);
    setTienePeliculas(false);
    setImagen(null);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="anime-form">
      <div className="form-group">
        <label>Título</label>
        <input name="titulo" type="text" placeholder="Ej: One Piece" value={data.titulo} onChange={handleChange} />
      </div>
      
      <div className="form-group">
        <label>Imagen de Portada</label>
        <input name="imagen" type="file" onChange={handleFileChange} required />
      </div>

      <div className="form-group">
        <label>Estado</label>
        <select name="estado" value={data.estado} onChange={handleChange}>
          <option value="Pendiente">Pendiente</option>
          <option value="Viendo">Viendo</option>
          <option value="Completado">Completado</option>
        </select>
      </div>

      <div className="form-group">
        <label>Género</label>
        <input name="genero" type="text" placeholder="Ej: Shonen, Mecha..." value={data.genero} onChange={handleChange} />
      </div>

      {data.estado === 'Viendo' && (
        <>
          <div className="form-group short">
            <label>Temp. Actual</label>
            <input name="temporadaActual" type="number" min="0" value={data.temporadaActual} onChange={handleChange} />
          </div>
          <div className="form-group short">
            <label>Ep. Actual</label>
            <input name="episodioActual" type="number" min="0" value={data.episodioActual} onChange={handleChange} />
          </div>
        </>
      )}

      <div className="form-group short">
        <label>Episodios (Total)</label>
        <input name="episodios" type="number" min="0" value={data.episodios} onChange={handleChange} />
      </div>

      <div className="form-group short">
        <label>Temporadas (Total)</label>
        <input name="temporadas" type="number" min="0" value={data.temporadas} onChange={handleChange} />
      </div>

      <div className="form-group short">
        <label>Puntuación (0-5)</label>
        <input 
          name="puntuacion"
          type="number" 
          min="0" 
          max="5" 
          step="0.5"
          value={data.puntuacion} 
          onChange={handleChange}
        />
      </div>

      <div className="form-group check-group">
        <label>¿OVAs?</label>
        <input 
          type="checkbox" 
          checked={tieneOvas}
          onChange={(e) => setTieneOvas(e.target.checked)}
        />
      </div>

      <div className="form-group check-group">
        <label>¿Películas?</label>
        <input 
          type="checkbox" 
          checked={tienePeliculas}
          onChange={(e) => setTienePeliculas(e.target.checked)}
        />
      </div>

      <div className="form-group full-width">
        <label>Comentarios</label>
        <textarea name="comentarios" placeholder="¿Qué te pareció?..." value={data.comentarios} onChange={handleChange}></textarea>
      </div>
      
      <button type="submit" className="full-width">Añadir Anime</button>
    </form>
  );
}

export default AnimeForm;