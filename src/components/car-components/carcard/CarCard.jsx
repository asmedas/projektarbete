import React, {useState} from 'react'
import './CarCard.css'

export default function CarCard({car}){
    const decodedImage = decodeURIComponent(car.image);

    if(car.booked){
        return(
            <div className='carcard'>
                <img src={`data:image/png;base64,${car.image}`} alt="car" />
                <h3>{car.name} {car.model}</h3>
                <p>{car.type}</p>
                <p>{car.feature1}</p>
                <p>{car.feature2}</p>
                <p>{car.feature3}</p>
                <p></p>
            </div>
        )
    }
    if(!car.booked){
        return(
            <div className='carcard'>
                <img src={`data:image/png;base64,${car.image}`} alt="car" />
                <h3>{car.name} {car.model}</h3><br />
                <p>{car.type}</p><br />
                <p>{car.feature1} / {car.feature2} / {car.feature3}</p>
                
            </div>
        )
    }
    
}