import React, {useEffect, useState} from 'react'
import { useAuth } from '../../auth/AuthProvider'
import BookingsCard from '../bookingscard/BookingsCard'
import GridWrapper from '../../gridWrapper/GridWrapper'

export default function MyBookings(){
    const [bookings, setBookings] = useState(null)
    const {authFetch, auth} = useAuth()

    useEffect(()=>{
        const load = async () => {
            try{
                const res = await authFetch(`http://localhost:8080/api/v1/bookings/me`)
                if(!res){
                    throw new Error("Failed to fetch bookings")
                }
                const data = await res.json()
                setBookings(data)
            }catch(error){
                console.error(error)
            }
        }
        load()
    }, [])
    return (
    <GridWrapper>
        {bookings === null && <p>Loading your bookings...</p>}

        {bookings !== null && bookings.length === 0 && (
        <p>You have no bookings yet.</p>
        )}

        {bookings !== null && bookings.length > 0 && (
        bookings.map(booking => (
            <BookingsCard key={booking.id} booking={booking} />
        ))
        )}
    </GridWrapper>
    )
}