import React,{useState, useEffect} from 'react'
import DataTable from '../tables/DataTable';
import { useAuth } from '../auth/AuthProvider';
import ContentBox from '../contentarea/ContentBox';

export default function AdminViewCars({onSelectContent}) {
  const [cars, setCars] = useState([])
  const {authFetch, auth} = useAuth()
  const [carId, setCarId] = useState(null)

  const deleteCar = async () => {
    if(carId === null){
        alert("Please select a car to delete")
        return;
    }
    try {
        const response = await authFetch(`http://localhost:8080/api/v1/cars/${carId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Failed to delete car");
        }
        setCars(prevCars => prevCars.filter(car => car.id !== carId));
        setCarId(null);
        alert("Car deleted successfully");
    } catch (err) {
        console.error(err);
    }
  }

  const updateCar = () => {
    if(carId === null){
        alert("Please select a car to update")
        return;
    }
    onSelectContent("UpdateCar", carId);
  }
  
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
      <ContentBox>
        <h2>selected car {carId}</h2>
        <button onClick={deleteCar}>Delete</button>
        <button onClick={updateCar}>Update car</button>
      </ContentBox> <br />
      <DataTable data={cars} setId={setCarId}/>
    </>
  );
}
