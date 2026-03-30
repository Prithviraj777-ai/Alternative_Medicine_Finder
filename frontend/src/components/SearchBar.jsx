import { useEffect, useState } from 'react';
import { fetchSuggestions } from '../services/api.js';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const { data } = await fetchSuggestions(query.trim());
        setSuggestions(data.data || []);
      } catch {
        setSuggestions([]);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  const submit = (event) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={submit} className="search-form">
        <input
          placeholder="Search medicines..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((s) => (
            <li key={s._id} onClick={() => onSearch(s.name)}>
              <strong>{s.name}</strong> · {s.manufacturer}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
