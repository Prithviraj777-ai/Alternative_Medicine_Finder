import MedicineCard from './MedicineCard.jsx';

function AlternativeList({ medicines, cheapestId }) {
  if (!medicines.length) return <p>No alternatives available.</p>;

  return (
    <section className="grid">
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine._id}
          medicine={medicine}
          showBestPrice={medicine._id === cheapestId}
        />
      ))}
    </section>
  );
}

export default AlternativeList;
