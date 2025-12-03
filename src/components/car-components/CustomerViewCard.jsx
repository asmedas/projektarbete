import React, {useState, useEffect} from 'react'
import CarCard from './carcard/CarCard';
import './CustomerViewCard.css'

export default function CustomerViewCard({onSelectContent}){
    const [cars, setCars] = useState([])

    useEffect(() => {
        const load = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/v1/cars");
            if (!res.ok) throw new Error("Failed to fetch cars");

            const data = await res.json();
            setCars(data);
        } catch (err) {
            console.error(err);
        }
        };

        load();
    }, []);

    return(
        <div className='customerviewcard'>
            {cars.map(car => (
                <CarCard key={car.id} car={car} onSelectContent={onSelectContent}/>
            ))}
        </div>
    )
}