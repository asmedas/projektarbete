import React from 'react'
import '../../index.css'
export default function DataTable({ data, setId }) {
  if (!data || data.length === 0) return <p>No results</p>;

  const columns = Object.keys(data[0]);

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
            <th key={c}>{c}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
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
