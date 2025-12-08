import React, {useState} from 'react'
import { useAuth } from '../../auth/AuthProvider'
import BookingsCard from '../bookingscard/BookingsCard'

export default function SelectBookingById(){
    const [bookingId, setBookingId] = useState("")
    const {authFetch} = useAuth()
    const [booking, setBooking] = useState(null)
    const [searched, setSearched] = useState(false)

    const handleBookingIdInput = (e) => {
        const numeric = e.target.value.replace(/\D/g, "")
        setBookingId(numeric);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        const load = async () => {
            try{
                const response = await authFetch(`http://localhost:8080/api/v1/bookings/${bookingId}`)
                if(!response.ok){
                    setSearched(true)
                    setBooking(null)
                    throw new Error("Failed to fetch booking")
                }
                const data = await response.json()
                setSearched(false)
                setBooking(data)
                console.log(data)
            }catch(error){
                console.error(error)
            }
        }
        load()
    }

    return(
        <>
            <h1>Search Booking by ID</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Booking ID:
                    <input type="text" value={bookingId} onChange={handleBookingIdInput} />
                </label>
                <button type="submit">Get Booking</button>
            </form><br />
            {booking === null && searched === false && <p>Search for a booking</p>}
            {searched === true && <p>No booking found with that ID</p>}
            {booking !== null && booking.id !== undefined && <BookingsCard booking={booking} />}
            
        </>
    )

}