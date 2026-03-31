import { Router } from 'express';
import {
  addMedicineHandler,
  compareMedicinesHandler,
  getAlternativesHandler,
  getByCategoryHandler,
  getMedicineDetailsHandler,
  searchMedicinesHandler,
  suggestionsHandler
} from '../controllers/medicineController.js';

const router = Router();

router.post('/add', addMedicineHandler);
router.get('/search', searchMedicinesHandler);
router.get('/suggestions', suggestionsHandler);
router.get('/compare', compareMedicinesHandler);
router.get('/category/:category', getByCategoryHandler);
router.get('/:id/alternatives', getAlternativesHandler);
router.get('/:id', getMedicineDetailsHandler);

export default router;
