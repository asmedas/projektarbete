import React, {useState} from 'react'

export default function AdminBookingsMenu({onSelectContent}){
    const [bookingsOpen, setBookingsOpen] = useState(false)

    if(bookingsOpen){
        return(
            <>
            <button onClick={() => setBookingsOpen(!bookingsOpen)}>
            Bookings {bookingsOpen ? "▲" : "▼"}
            </button>

            <div className="submenu">
                <button onClick={() => onSelectContent("GetBookings")}>Bookings</button>
                <button onClick={() => onSelectContent("BookingsByUserId")}>Search bookings</button>
            </div>
            </>
        )
    }
    if(!bookingsOpen){
        return(
            <button onClick={() => setBookingsOpen(!bookingsOpen)}>
            Bookings {bookingsOpen ? "▲" : "▼"}
            </button>
        )
    }
}