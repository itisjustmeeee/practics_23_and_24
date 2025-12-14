import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { color } from 'chart.js/helpers';

ChartJS.register(ArcElement, Tooltip, Legend);

function StatisticsPage() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      try {
        setTechnologies(JSON.parse(saved));
      } catch (e) {
        console.error('Ошибка парсинга данных из localStorage', e);
      }
    }
  }, []); // ← зависимость [] — эффект запускается один раз

  const statusCount = {
    'not-started': technologies.filter(t => t.status === 'not-started').length,
    'in-progress': technologies.filter(t => t.status === 'in-progress').length,
    'completed': technologies.filter(t => t.status === 'completed').length
  };

  const total = technologies.length;
  const completedPercent = total > 0 ? Math.round((statusCount.completed / total) * 100) : 0;

  const data = {
    labels: ['Не начато', 'В процессе', 'Завершено'],
    datasets: [
      {
        data: [statusCount['not-started'], statusCount['in-progress'], statusCount.completed],
        backgroundColor: ['#e84040ff', '#3184e9ff', '#71ec4eff'],
        borderColor: ['#fff'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}` } }
    }
  };

  return (
    <div className="page statistics-page">
      <h1>Статистика прогресса</h1>

      <div className="stats-summary">
        <div className="stat-card">
          <h3>Всего технологий</h3>
          <p className="big-number">{total}</p>
        </div>
        <div className="stat-card">
          <h3>Завершено</h3>
          <p className="big-number success">{statusCount.completed}</p>
          <p className="percent">{completedPercent}%</p>
        </div>
        <div className="stat-card">
          <h3>В процессе</h3>
          <p className="big-number progress">{statusCount['in-progress']}</p>
        </div>
        <div className="stat-card">
          <h3>Не начато</h3>
          <p className="big-number pending">{statusCount['not-started']}</p>
        </div>
      </div>

      {total > 0 ? (
        <div className="chart-container">
          <h2>Распределение по статусам</h2>
          <Pie data={data} options={options} />
        </div>
      ) : (
        <p>Нет данных для отображения графика</p>
      )}
    </div>
  );
}

export default StatisticsPage;