import React, {useState} from 'react'
import '../../index.css'
export default function DataTable({ data, setId }) {
  if (!data || data.length === 0) return <p>No results</p>;

  const columns = Object.keys(data[0]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    const sorted = [...data].sort((a, b) => {
      const x = a[sortConfig.key];
      const y = b[sortConfig.key];

      // String sorting
      if (typeof x === 'string' && typeof y === 'string') {
        return sortConfig.direction === 'asc'
          ? x.localeCompare(y)
          : y.localeCompare(x);
      }

      // Number / boolean sorting
      if (x > y) return sortConfig.direction === 'asc' ? 1 : -1;
      if (x < y) return sortConfig.direction === 'asc' ? -1 : 1;
      return 0;
    });

    return sorted;
  }, [data, sortConfig]);

  const requestSort = (column) => {
    setSortConfig((prev) => {
      if (prev.key === column) {
        return {
          key: column,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key: column, direction: 'asc' };
    });
  };

  const handleOnClick = (id) => {
    if(setId){
      setId(id)
    } else{
    }
  }

  //determine if it's an image or not
  const isBase64Image = (str) => {
    if(typeof str !== 'string') return false;
      return str.length > 100 && (str.includes('data:image') || str.match(/^[A-Za-z0-9+/=]+$/));
    }

  const renderCell = (value) => {
      if (typeof value === 'boolean') {
      return (
        <span className={`badge ${value ? 'booked' : 'available'}`}>
          {value ? 'Booked' : 'Available'}
        </span>
      );
    }
    if (Array.isArray(value)) {
      return JSON.stringify(value);
    }

    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    if (typeof value === 'string' && isBase64Image(value)) {
      // Om det är en base64 img försök visa som bild
      try {
        const decoded = decodeURIComponent(value);
        return <img src={`data:image/png;base64,${decoded}`}/>;
      } catch (e) {
        return value;
      }
    } else {
      return value // annars returnera strängen
    }
  }

  return (
    <table className='table'>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c} onClick={() => requestSort(c)} style={{ cursor: 'pointer' }}>
              {c}
              {sortConfig.key === c && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {sortedData.map((row, i) => (
          <tr key={row.id || i} onClick={() => handleOnClick(row.id)}>
            {columns.map((c) => (
              <td key={c}>{renderCell(row[c])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
