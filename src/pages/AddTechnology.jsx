import { useNavigate } from 'react-router-dom';
import RoadmapLoader from '../components/RoadmapLoader';
import { useTechnologies } from '../hooks/useTechnologies';

function AddTechnology() {
  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();

  const handleManualAdd = (tech) => {
    addTechnology(tech);
    alert('Технология добавлена вручную!');
    navigate('/technologies');
  };

  const handleApiAdd = (tech) => {
    addTechnology(tech);
    alert('Технология успешно загружена из внешнего API!');
    navigate('/technologies');
  };

  return (
    <div className="page add-technology-page">
      <h1>Добавить технологию</h1>

      <section className="api-loader-section">
        <h2>Загрузить из внешнего источника</h2>
        <RoadmapLoader onLoad={handleApiAdd} />
      </section>

      <section className="manual-add-section">
        <h2>Или добавить вручную</h2>
        <p>Пока реализовано только через API. В будущем добавим форму.</p>
        <button className="btn" onClick={() => navigate('/technologies')}>
          ← Назад к списку
        </button>
      </section>
    </div>
  );
}

export default AddTechnology;