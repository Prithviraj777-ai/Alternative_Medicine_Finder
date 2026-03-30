import { Link } from 'react-router-dom';
import CheapestBadge from './CheapestBadge.jsx';

function MedicineCard({ medicine, showBestPrice }) {
  return (
    <article className="card">
      <div className="card-header">
        <h3>{medicine.name}</h3>
        {showBestPrice && <CheapestBadge />}
      </div>
      <p>Manufacturer: {medicine.manufacturer || 'N/A'}</p>
      <p>Salt: {medicine.saltComposition}</p>
      <p>Price: ₹{medicine.price}</p>
      <p>Pack: {medicine.packSize || 'N/A'}</p>
      <p>Form: {medicine.form || 'N/A'}</p>
      <p>Category: {medicine.category || 'N/A'}</p>
      <div className="card-actions">
        <Link to={`/medicine/${medicine._id}`}>View Details</Link>
      </div>
    </article>
  );
}

export default MedicineCard;
