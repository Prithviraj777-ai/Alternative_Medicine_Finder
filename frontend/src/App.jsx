import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MedicineDetails from './pages/MedicineDetails.jsx';
import Alternatives from './pages/Alternatives.jsx';

function App() {
  return (
    <div className="app-shell">
      <header className="header">
        <h1>Alternative Medicine Finder</h1>
        <nav>
          <Link to="/">Home</Link>
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
