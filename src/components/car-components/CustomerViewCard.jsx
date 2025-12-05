import React, {useState, useEffect} from 'react'
import CarCard from './carcard/CarCard';
import './CustomerViewCard.css'
import ContentBox from '../contentarea/ContentBox';
import GridWrapper from '../gridWrapper/GridWrapper';

export default function CustomerViewCard({onSelectContent}){
    const [cars, setCars] = useState([])
    const [nameFilter, setNameFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

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

    const filteredCars = cars.filter(car => {
        const matchesName = car.name.toLowerCase().includes(nameFilter.toLowerCase());
        const matchesType = car.type.toLowerCase().includes(typeFilter.toLowerCase());
        return matchesName && matchesType;
    });

    return(
        <>
            <ContentBox>
                <input type="text" placeholder="Filter by name" value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}/>
                <input type="text" placeholder="Filter by type" value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}/>
            </ContentBox> <br />
            <GridWrapper>
                {filteredCars.map(car => (
                    <CarCard key={car.id} car={car} onSelectContent={onSelectContent}/>
                ))}
            </GridWrapper>
        </>
    )
}