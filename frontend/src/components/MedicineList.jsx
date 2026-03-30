import MedicineCard from './MedicineCard.jsx';

function MedicineList({ medicines }) {
  if (!medicines.length) return <p>No medicines found.</p>;

  return (
    <section className="grid">
      {medicines.map((medicine) => (
        <MedicineCard key={medicine._id} medicine={medicine} />
      ))}
    </section>
  );
}

export default MedicineList;
