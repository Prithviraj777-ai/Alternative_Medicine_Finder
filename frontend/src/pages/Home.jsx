import { useEffect, useState } from 'react';
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
        const params = { name: query, page, limit: 6 };
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

  return (
    <div>
      <SearchBar onSearch={(q) => { setPage(1); setQuery(q); }} />

      <div className="toolbar">
        <select value={category} onChange={(e) => { setPage(1); setCategory(e.target.value); }}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="recent-searches">
        <strong>Recent:</strong>{' '}
        {(JSON.parse(localStorage.getItem('recentSearches') || '[]')).join(', ') || 'No searches yet'}
      </div>

      {loading ? <Loader /> : <MedicineList medicines={medicines} />}

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Home;
