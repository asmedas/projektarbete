import React, {useState} from 'react'
import { useAuth } from '../../auth/AuthProvider'

export default function OrderCar({car, onSelectContent}){
    const {auth, authFetch} = useAuth()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    

    const handeStartDateInput = (e) => setStartDate(e.target.value)
    const handleEndDateInput = (e) => setEndDate(e.target.value)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(car.booked){
            alert("car already booked")
            return
        }

        const bookingData = {
            userId: auth.id,
            carId: car.id,
            fromDate: startDate,
            toDate: endDate,
            active: true
        };
        alert(auth.id)
        if(auth.user && auth.id && !auth.isAdmin){
            try {
                const response = await authFetch("http://localhost:8080/api/v1/bookings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bookingData)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Booking failed: ${response.status} - ${errorText}`);
                }

                console.log("Booking successful! Status:", response.status);
                alert("Car booked successfully!");
                onSelectContent("ViewCars");

                
                onSelectContent("ViewCars");

            } catch (error) {
                console.error("Booking failed:", error);
                alert("Failed to book car. Are you logged in?");
            }
        }
    };

    if (auth.loading) {
    return <div>Loading authentication...</div>
    }

    if (!auth.user || !auth.authHeader) {
        alert("You must be logged in to book a car");
        return <div>Please log in first</div>;
    }
    return (
        <div className='form'>
            <h3>{car.name} {car.model}</h3>
            <p>price: {car.price}$</p>
            <form onSubmit={handleSubmit}>

                <label htmlFor="date">Date from</label><br />
                <input type="date" id="startDate" value={startDate} onChange={handeStartDateInput}/><br />

                <label htmlFor="date">Date to</label><br />
                <input type="date" id="endDate" value={endDate} onChange={handleEndDateInput}/><br /><br />

                <button type='submit'>Order</button>
            </form>
        </div>
    )
}