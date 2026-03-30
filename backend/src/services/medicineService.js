import Medicine from '../models/Medicine.js';
import { findCheapest, sortByPrice } from '../utils/priceUtils.js';

export const addMedicine = async (payload) => {
  const medicine = await Medicine.create(payload);
  return medicine;
};

export const searchMedicines = async ({ name = '', category, page = 1, limit = 10 }) => {
  const filters = {};

  if (name?.trim()) {
    filters.name = { $regex: name.trim(), $options: 'i' };
  }

  if (category?.trim()) {
    filters.category = { $regex: `^${category.trim()}$`, $options: 'i' };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Medicine.find(filters).sort({ name: 1 }).skip(skip).limit(Number(limit)),
    Medicine.countDocuments(filters)
  ]);

  return {
    items,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / Number(limit)) || 1
  };
};

export const getMedicineById = async (id) => Medicine.findById(id);

export const getAlternatives = async (id) => {
  const medicine = await Medicine.findById(id);
  if (!medicine) return null;

  const alternatives = await Medicine.find({
    _id: { $ne: medicine._id },
    saltComposition: medicine.saltComposition
  });

  const sorted = sortByPrice(alternatives);
  const cheapest = findCheapest(sorted);

  return { medicine, alternatives: sorted, cheapest };
};

export const getByCategory = async (category, page = 1, limit = 10) =>
  searchMedicines({ category, page, limit });

export const compareBySalt = async (saltComposition) => {
  const medicines = await Medicine.find({
    saltComposition: { $regex: `^${saltComposition}$`, $options: 'i' }
  });

  const sorted = sortByPrice(medicines);

  return {
    medicines: sorted,
    cheapest: findCheapest(sorted)
  };
};

export const getSuggestions = async (query) => {
  if (!query?.trim()) return [];

  return Medicine.find({ name: { $regex: query.trim(), $options: 'i' } })
    .sort({ name: 1 })
    .limit(5)
    .select('name manufacturer price category');
};
