import React,{useState, useEffect} from 'react'
import DataTable from '../tables/DataTable';
import { useAuth } from '../auth/AuthProvider';
import ContentBox from '../contentarea/ContentBox';

export default function AdminViewCars() {
  const [cars, setCars] = useState([])
  const {authFetch} = useAuth()
  const [carId, setCarId] = useState()
  
  useEffect(() => {
      const load = async () => {
      try {
          const res = await authFetch("http://localhost:8080/api/v1/cars");
          if (!res.ok) throw new Error("Failed to fetch cars");

          const data = await res.json();
          setCars(data);
      } catch (err) {
          console.error(err);
      }
      };

      load();
    
  }, []);

  return (
    <>
      <ContentBox></ContentBox>
      <DataTable data={cars} />
    </>
  );
}
