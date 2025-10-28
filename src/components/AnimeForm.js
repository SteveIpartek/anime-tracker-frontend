import React, { useState } from 'react';

function AnimeForm({ onAddAnime }) {
  const [data, setData] = useState({
    titulo: '',
    estado: 'Pendiente',
    episodios: '0',
    temporadas: '0',
    genero: '',
    comentarios: ''
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
    
    const formData = new FormData();
    formData.append('imagen', imagen);
    
    // Adjunta todos los datos del formulario
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // Adjunta los valores de los checkboxes (convertidos de booleano a 1 o 0)
    formData.append('ovas', tieneOvas ? 1 : 0);
    formData.append('peliculas', tienePeliculas ? 1 : 0);

    onAddAnime(formData);

    // Resetea el formulario
    setData({
      titulo: '', estado: 'Pendiente', episodios: '0', temporadas: '0',
      genero: '', comentarios: ''
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
        <input name="titulo" type="text" placeholder="Ej: Cowboy Bebop" value={data.titulo} onChange={handleChange} />
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

      <div className="form-group short">
        <label>Episodios</label>
        <input name="episodios" type="number" value={data.episodios} onChange={handleChange} />
      </div>

      <div className="form-group short">
        <label>Temporadas</label>
        <input name="temporadas" type="number" value={data.temporadas} onChange={handleChange} />
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