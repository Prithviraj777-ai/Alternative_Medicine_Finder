import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlternativeList from '../components/AlternativeList.jsx';
import Loader from '../components/Loader.jsx';
import PriceComparisonTable from '../components/PriceComparisonTable.jsx';
import { compareMedicines, fetchAlternatives } from '../services/api.js';
import ComparisonMode from '../components/ComparisonMode.jsx';

function Alternatives() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [baseMedicine, setBaseMedicine] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [cheapestId, setCheapestId] = useState('');
  const [comparisonSet, setComparisonSet] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await fetchAlternatives(id);
        setBaseMedicine(data.medicine);
        setAlternatives(data.alternatives || []);
        setCheapestId(data.cheapest?._id || '');

        if (data?.medicine?.saltComposition) {
          const compareResp = await compareMedicines(data.medicine.saltComposition);
          setComparisonSet(compareResp.data.medicines || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <section>
      <h2>Alternatives for {baseMedicine?.name}</h2>
      <AlternativeList medicines={alternatives} cheapestId={cheapestId} />
      <h3>Price Comparison</h3>
      <PriceComparisonTable medicines={alternatives} cheapestId={cheapestId} />
      <ComparisonMode medicines={comparisonSet} />
    </section>
  );
}

export default Alternatives;
