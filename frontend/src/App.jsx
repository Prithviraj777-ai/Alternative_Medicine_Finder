import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MedicineDetails from './pages/MedicineDetails.jsx';
import Alternatives from './pages/Alternatives.jsx';

function App() {
  return (
    <div className="app-shell">
      <header className="header">
        <div className="brand-block">
          <div className="brand-icon">💊</div>
          <div>
            <h1>Alternative Medicine Finder</h1>
            <p>Find same-salt options at better prices</p>
          </div>
        </div>

        <nav>
          <Link to="/">Home</Link>
          <a href="#">Download App</a>
          <a href="#">Login / Signup</a>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medicine/:id" element={<MedicineDetails />} />
          <Route path="/medicine/:id/alternatives" element={<Alternatives />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
