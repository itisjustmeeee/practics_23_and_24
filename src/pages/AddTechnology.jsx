import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoadmapLoader from '../components/RoadmapLoader';
import { useTechnologies } from '../hooks/useTechnologies';

function AddTechnology() {
  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Frontend');

  const handleManualAdd = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Введите название технологии');
      return;
    }

    const newTech = {
      title: title.trim(),
      desc: desc.trim() || 'Без описания',
      category,
      status: 'not-started',
      note: '',
      iconUrl: ''
    };

    addTechnology(newTech);
    alert('Технология добавлена вручную!');
    
    setTitle('');
    setDesc('');
    setCategory('Frontend');

    navigate('/technologies');
  };

  const handleApiAdd = (tech) => {
    addTechnology(tech);
    alert('Технология успешно загружена из внешнего API!');
    navigate('/technologies');
  };

  return (
    <div className="page add-technology-page">
      <h1>Добавить новую технологию</h1>

      <section className="api-loader-section">
        <h2>Загрузить из внешнего источника</h2>
        <RoadmapLoader onLoad={handleApiAdd} />
      </section>

      <section className="manual-add-section">
        <h2>Или добавить вручную</h2>

        <form onSubmit={handleManualAdd} className="add-form">
          <div className="form-group">
            <label htmlFor="title">Название технологии</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: GraphQL"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="desc">Описание (необязательно)</label>
            <textarea
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Что вы планируете изучить..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Категория</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Data Science">Data Science</option>
              <option value="DevOps">DevOps</option>
              <option value="Mobile">Mobile</option>
              <option value="Другое">Другое</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Добавить вручную
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => navigate('/technologies')}
            >
              Отмена
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddTechnology;