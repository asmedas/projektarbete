import React, {useState} from 'react'
import './CarCard.css'
import {useAuth} from '../../auth/AuthProvider'
import OrderCar from '../ordercar/OrderCar';

export default function CarCard({car, onSelectContent}){
    const decodedImage = decodeURIComponent(car.image);
    const {auth} = useAuth()

    const handleClick = () => {
      if (car.booked){
          alert("Already booked!")
          return;
      }

      if (!auth.user || !auth.authHeader) {
          alert("user not logged in, please log in")
          onSelectContent('Login');
          return;
      }

      if (auth.isAdmin) {
          return;
      }
      
      onSelectContent("OrderCar", car)
    }
    
    return (
    <div className={`carcard ${car.booked ? 'booked' : ''}`} onClick={handleClick}>
      <img 
        src={`data:image/png;base64,${car.image}`} 
        alt={`${car.name} ${car.model}`} 
      />
      <h3>{car.name} {car.model}</h3>
      <p>{car.type}</p>
      <p>{car.feature1} • {car.feature3} • {car.feature2}</p>
      {car.booked && <p className="panel negative">Already Booked</p>}
      {!car.booked && 
        <>
            <label htmlFor="price">Price: {car.price}$ </label>
            <p className="panel positive">Purchase</p>
        </>}
    </div>
  );
    
}