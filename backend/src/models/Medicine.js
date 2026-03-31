import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true, trim: true },
    manufacturer: { type: String, trim: true },
    saltComposition: { type: String, required: true, index: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    packSize: { type: String, trim: true },
    form: { type: String, trim: true },
    mrp: { type: Number, min: 0 },
    category: { type: String, trim: true, index: true },
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/150',
      trim: true
    },
    availabilityStatus: {
      type: String,
      enum: ['In Stock', 'Limited', 'Out of Stock'],
      default: 'In Stock'
    }
  },
  { timestamps: true }
);

medicineSchema.index({ name: 1 });
medicineSchema.index({ saltComposition: 1 });
medicineSchema.index({ category: 1 });

const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;
