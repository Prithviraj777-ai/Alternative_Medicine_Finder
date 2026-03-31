import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { connectDB } from '../config/db.js';
import Medicine from '../models/Medicine.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BATCH_SIZE = 200;

const normalizeRows = (rows) =>
  rows.map((row) => ({
    ...row,
    price: Number(row.price),
    mrp: row.mrp !== undefined ? Number(row.mrp) : undefined
  }));

const parseCsv = (csvString) => {
  const [headerLine, ...lines] = csvString.trim().split('\n');
  const headers = headerLine.split(',').map((h) => h.trim());

  return lines.map((line) => {
    const values = line.split(',').map((v) => v.trim());
    return headers.reduce((acc, key, idx) => {
      acc[key] = values[idx];
      return acc;
    }, {});
  });
};

const insertInBatches = async (rows) => {
  let inserted = 0;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    await Medicine.insertMany(batch, { ordered: false });
    inserted += batch.length;
  }
  return inserted;
};

const seed = async () => {
  try {
    await connectDB();

    const dataFile = process.argv[2] || path.join(__dirname, '../data/medicines.sample.json');
    const ext = path.extname(dataFile).toLowerCase();
    const fileContent = await fs.readFile(dataFile, 'utf-8');

    const rows = ext === '.csv' ? parseCsv(fileContent) : JSON.parse(fileContent);
    const medicines = normalizeRows(rows);

    await Medicine.deleteMany({});
    const insertedCount = await insertInBatches(medicines);

    console.log(`Seeded ${insertedCount} medicines from ${dataFile}`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
