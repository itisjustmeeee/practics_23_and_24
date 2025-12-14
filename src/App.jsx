// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import TechnologyCard from './components/TechnologyCard';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import StatisticsPage from './pages/Statistics';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/technology/:techId" element={<TechnologyDetail />} />
            <Route path="/add-technology" element={<AddTechnology />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route 
              path="*" 
              element={
                <div className="page not-found">
                  <h1>404 — Страница не найдена</h1>
                  <p>Запрошенная страница не существует.</p>
                  <Link to="/" className="btn btn-primary">На главную</Link>
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;