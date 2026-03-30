import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import { fetchMedicineById } from '../services/api.js';

function MedicineDetails() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await fetchMedicineById(id);
        setMedicine(data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (!medicine) return <p>Medicine not found.</p>;

  return (
    <section className="details-card">
      <h2>{medicine.name}</h2>
      <p>Manufacturer: {medicine.manufacturer}</p>
      <p>Salt Composition: {medicine.saltComposition}</p>
      <p>Price: ₹{medicine.price}</p>
      <p>Pack Size: {medicine.packSize}</p>
      <p>Form: {medicine.form}</p>
      <p>Category: {medicine.category}</p>
      <p>Status: {medicine.availabilityStatus}</p>
      <div className="card-actions">
        <Link to={`/medicine/${id}/alternatives`}>Find Alternatives</Link>
      </div>
    </section>
  );
}

export default MedicineDetails;
