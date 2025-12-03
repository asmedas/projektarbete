import React,{useState, useEffect} from 'react'
import DataTable from '../tables/DataTable';
import { useAuth } from '../auth/AuthProvider';

export default function AdminViewCars({setId}) {
  const [cars, setCars] = useState([])
  const {authFetch} = useAuth()
  
  useEffect(() => {
    if(setId){
      const load = async () => {
      try {
          const res = await authFetch("http://localhost:8080/api/v1/bookings");
          if (!res.ok) throw new Error("Failed to fetch cars");

          const data = await res.json();
          setCars(data);
      } catch (err) {
          console.error(err);
      }
      };

      load();
    }
    if(!setId){
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
    }
  }, []);

  if(setId){
    return <DataTable data={cars} setId={setId}/>
  } else {
    return <DataTable data={cars} />;
  }
}
