import React, {useState} from 'react'
import { useAuth } from '../../auth/AuthProvider'

export default function UpdateBooking({booking, onSelectContent}) {
    const {authFetch} = useAuth()
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await authFetch(`http://localhost:8080/api/v1/bookings/${booking.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fromDate,
                    toDate
                })
            })
            if(!response.ok){
                throw new Error("Failed to update booking")
            }
            alert("Booking updated successfully")
        } catch(error){
            console.error(error)
            alert("Error updating booking")
        }
        onSelectContent("GetBookings")
    }

    return(
        <div className='form'>
        <h2>Update Booking ID: {booking.id}</h2>
        <form onSubmit={handleSubmit}>
            <label>From Date:</label>
            <input 
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
            />

            <label>To Date:</label>
            <input 
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
            />
            <button type="submit">Update Booking</button>
        </form>
        </div>
    )
}