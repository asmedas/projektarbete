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
                <button onClick={() => onSelectContent("SelectBookingById")}>Bookings by User-id</button>
                <button onClick={() => onSelectContent("GetActiveBookings")}>Active bookings</button>
                <button onClick={() => onSelectContent("GetBookingsById")}>Bookings by id</button>
                <button onClick={() => onSelectContent("UpdateBooking")}>Update booking</button>
                <button onClick={() => onSelectContent("DeleteBooking")}>Delete booking</button>
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