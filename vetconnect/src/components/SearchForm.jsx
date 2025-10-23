import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ExploreVets({ vets }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const filteredVets = vets.filter(vet =>
    vet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter ? vet.specialty === filter : true)
  );

  return (
    <div className="container">
      <h2>Explore Vets</h2>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search vet..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select onChange={e => setFilter(e.target.value)}>
          <option value="">All Specialties</option>
          <option value="Small Animals">Small Animals</option>
          <option value="Large Animals">Large Animals</option>
          <option value="Exotic Animals">Exotic Animals</option>
        </select>
      </div>

      <div className="explore-vets">
        {filteredVets.map(vet => (
          <div key={vet.id} className="vet-card highlighted">
            <Link to={`/vet/${vet.id}`}>
              <img src={vet.image} alt={vet.name} />
              <h3>{vet.name}</h3>
              <p>{vet.specialty}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
