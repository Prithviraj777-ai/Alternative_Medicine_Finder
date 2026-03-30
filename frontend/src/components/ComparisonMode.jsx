function ComparisonMode({ medicines }) {
  if (!medicines.length) return null;

  return (
    <div className="comparison-mode">
      <h3>Comparison Mode</h3>
      <div className="comparison-grid">
        {medicines.map((medicine) => (
          <div className="comparison-item" key={`cmp-${medicine._id}`}>
            <h4>{medicine.name}</h4>
            <p><strong>Price:</strong> ₹{medicine.price}</p>
            <p><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
            <p><strong>Pack:</strong> {medicine.packSize}</p>
            <p><strong>Form:</strong> {medicine.form}</p>
            <p><strong>Category:</strong> {medicine.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComparisonMode;
