import axios from 'axios';
import { medicines as mockMedicines } from './mockData.js';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

const wait = (data) => new Promise((resolve) => setTimeout(() => resolve({ data }), 120));

const getMockSearch = ({ name = '', category, page = 1, limit = 10 }) => {
  const q = name.trim().toLowerCase();
  const filtered = mockMedicines.filter((m) => {
    const matchesName = !q || m.name.toLowerCase().includes(q);
    const matchesCategory = !category || m.category.toLowerCase() === category.toLowerCase();
    return matchesName && matchesCategory;
  });

  const p = Number(page);
  const l = Number(limit);
  const start = (p - 1) * l;
  const items = filtered.slice(start, start + l);

  return {
    success: true,
    items,
    total: filtered.length,
    page: p,
    limit: l,
    totalPages: Math.max(1, Math.ceil(filtered.length / l))
  };
};

const getMockAlternatives = (id) => {
  const medicine = mockMedicines.find((m) => m._id === id);
  if (!medicine) return { success: false, medicine: null, alternatives: [], cheapest: null };

  const alternatives = mockMedicines
    .filter((m) => m._id !== id && m.saltComposition === medicine.saltComposition)
    .sort((a, b) => a.price - b.price);

  return { success: true, medicine, alternatives, cheapest: alternatives[0] || null };
};

export const searchMedicines = (params) =>
  useMock ? wait(getMockSearch(params || {})) : api.get('/medicines/search', { params });

export const fetchSuggestions = (q) => {
  if (!useMock) return api.get('/medicines/suggestions', { params: { q } });
  const query = (q || '').toLowerCase();
  const data = mockMedicines
    .filter((m) => m.name.toLowerCase().includes(query))
    .slice(0, 5)
    .map(({ _id, name, manufacturer, price, category }) => ({ _id, name, manufacturer, price, category }));
  return wait({ success: true, data });
};

export const fetchMedicineById = (id) =>
  useMock
    ? wait({ success: true, data: mockMedicines.find((m) => m._id === id) || null })
    : api.get(`/medicines/${id}`);

export const fetchAlternatives = (id) =>
  useMock ? wait(getMockAlternatives(id)) : api.get(`/medicines/${id}/alternatives`);

export const fetchByCategory = (category, page, limit) =>
  useMock
    ? wait(getMockSearch({ category, page, limit }))
    : api.get(`/medicines/category/${category}`, { params: { page, limit } });

export const compareMedicines = (salt) => {
  if (!useMock) return api.get('/medicines/compare', { params: { salt } });
  const meds = mockMedicines
    .filter((m) => m.saltComposition.toLowerCase() === salt.toLowerCase())
    .sort((a, b) => a.price - b.price);
  return wait({ success: true, medicines: meds, cheapest: meds[0] || null });
};

export default api;
