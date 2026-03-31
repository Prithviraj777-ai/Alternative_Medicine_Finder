import mongoose from 'mongoose';
import {
  addMedicine,
  compareBySalt,
  getAlternatives,
  getByCategory,
  getMedicineById,
  getSuggestions,
  searchMedicines
} from '../services/medicineService.js';

export const addMedicineHandler = async (req, res, next) => {
  try {
    const medicine = await addMedicine(req.body);
    res.status(201).json({ success: true, data: medicine });
  } catch (error) {
    next(error);
  }
};

export const searchMedicinesHandler = async (req, res, next) => {
  try {
    const { name = '', category, page = 1, limit = 10 } = req.query;
    const result = await searchMedicines({ name, category, page, limit });
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const getMedicineDetailsHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid medicine ID' });
    }

    const medicine = await getMedicineById(id);
    if (!medicine) {
      return res.status(404).json({ success: false, message: 'Medicine not found' });
    }

    res.json({ success: true, data: medicine });
  } catch (error) {
    next(error);
  }
};

export const getAlternativesHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid medicine ID' });
    }

    const result = await getAlternatives(id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Medicine not found' });
    }

    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const getByCategoryHandler = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await getByCategory(category, page, limit);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const compareMedicinesHandler = async (req, res, next) => {
  try {
    const { salt } = req.query;
    if (!salt?.trim()) {
      return res.status(400).json({ success: false, message: 'salt query parameter is required' });
    }

    const result = await compareBySalt(salt.trim());
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const suggestionsHandler = async (req, res, next) => {
  try {
    const { q = '' } = req.query;
    const suggestions = await getSuggestions(q);
    res.json({ success: true, data: suggestions });
  } catch (error) {
    next(error);
  }
};
