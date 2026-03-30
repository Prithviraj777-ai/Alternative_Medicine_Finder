import CheapestBadge from './CheapestBadge.jsx';

function PriceComparisonTable({ medicines, cheapestId }) {
  if (!medicines.length) return null;

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Price</th>
            <th>Salt</th>
            <th>Tag</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine._id}>
              <td>{medicine.name}</td>
              <td>{medicine.manufacturer}</td>
              <td>₹{medicine.price}</td>
              <td>{medicine.saltComposition}</td>
              <td>{medicine._id === cheapestId ? <CheapestBadge /> : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PriceComparisonTable;
