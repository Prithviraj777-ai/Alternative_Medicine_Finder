import { useEffect, useMemo, useState } from 'react';
import MedicineList from '../components/MedicineList.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Loader from '../components/Loader.jsx';
import { searchMedicines } from '../services/api.js';

const categories = ['All', 'Pain Relief', 'Antibiotic', 'Vitamin'];

function Home() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const params = { name: query, page, limit: 8 };
        if (category !== 'All') params.category = category;

        const { data } = await searchMedicines(params);
        setMedicines(data.items || []);
        setTotalPages(data.totalPages || 1);

        const prevSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        if (query.trim()) {
          const updated = [query, ...prevSearches.filter((x) => x !== query)].slice(0, 5);
          localStorage.setItem('recentSearches', JSON.stringify(updated));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [query, category, page]);

  const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

  const localFavorites = useMemo(() => {
    return [...medicines].sort((a, b) => (b.mrp || b.price) - b.price - ((a.mrp || a.price) - a.price)).slice(0, 6);
  }, [medicines]);

  return (
    <div className="home-shell">
      <section className="hero-panel">
        <p className="hero-kicker">Trusted medicine comparison platform</p>
        <h2>Say goodbye to high medicine prices</h2>
        <p>Search any medicine and instantly find safer, lower-cost alternatives with the same salt composition.</p>

        <div className="hero-search-card">
          <SearchBar onSearch={(q) => { setPage(1); setQuery(q); }} />
          <div className="hero-controls">
            <select value={category} onChange={(e) => { setPage(1); setCategory(e.target.value); }}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button type="button" className="pill">Voice Search 🎙️</button>
          </div>
        </div>

        <div className="recent-searches">
          <strong>Recent searches:</strong>{' '}
          {recentSearches.length ? recentSearches.join(' • ') : 'No searches yet'}
        </div>
      </section>

      <section className="section-head">
        <h3>Featured alternatives</h3>
        <span>Sorted results • compare and save more</span>
      </section>

      {loading ? <Loader /> : <MedicineList medicines={medicines} />}

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>

      <section className="section-head top-gap">
        <h3>Local favourites 🏡</h3>
        <span>Most value-for-money picks in your city</span>
      </section>
      <div className="favorites-row">
        {localFavorites.map((medicine) => (
          <article className="mini-card" key={`fav-${medicine._id}`}>
            <div className="mini-card-image">{medicine.name.slice(0, 2).toUpperCase()}</div>
            <h4>{medicine.name}</h4>
            <p>₹{medicine.price}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;
