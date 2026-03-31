import { useState } from 'react';
import { Link } from 'react-router-dom';
import CheapestBadge from './CheapestBadge.jsx';

const FALLBACK_IMAGE = 'https://via.placeholder.com/300x200?text=Medicine';

function MedicineCard({ medicine, showBestPrice }) {
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const discount = medicine.mrp && medicine.mrp > medicine.price
    ? Math.round(((medicine.mrp - medicine.price) / medicine.mrp) * 100)
    : 0;

  return (
    <article className="card">
      <div className={`medicine-thumb ${isLoadingImage ? 'skeleton' : ''}`}>
        <img
          src={medicine.imageUrl || FALLBACK_IMAGE}
          alt={medicine.name}
          loading="lazy"
          onLoad={() => setIsLoadingImage(false)}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
            setIsLoadingImage(false);
          }}
        />
      </div>

      <div className="card-header">
        <h3>{medicine.name}</h3>
        {showBestPrice && <CheapestBadge />}
      </div>

      <p className="manufacturer">{medicine.manufacturer || 'N/A'}</p>
      <p className="salt">{medicine.saltComposition}</p>

      <div className="price-row">
        <strong>₹{medicine.price}</strong>
        {medicine.mrp ? <span className="mrp">MRP ₹{medicine.mrp}</span> : null}
        {discount > 0 ? <span className="off-tag">{discount}% OFF</span> : null}
      </div>

      <p>Pack: {medicine.packSize || 'N/A'} • Form: {medicine.form || 'N/A'}</p>
      <p>Category: {medicine.category || 'N/A'}</p>

      <div className="card-actions">
        <Link to={`/medicine/${medicine._id}`}>Compare now</Link>
        <button type="button">Add</button>
      </div>
    </article>
  );
}

export default MedicineCard;
