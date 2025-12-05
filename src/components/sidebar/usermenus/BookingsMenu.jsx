import React, {useState} from 'react'

export default function BookingsMenu({onSelectContent}){
    const [bookingsOpen, setBookingsOpen] = useState(false)

    if(!bookingsOpen){
        return(
        <button onClick={()=>setBookingsOpen(!bookingsOpen)}>
            Bookings {bookingsOpen ? "▲" : "▼"}
        </button>
        )
    }
    if(bookingsOpen){
        return(
            <>
                <button onClick={()=>setBookingsOpen(!bookingsOpen)}>
                    Bookings {bookingsOpen ? "▲" : "▼"}
                </button>
                <div className='submenu'>
                    <button onClick={() => onSelectContent("MyBookings")}>My bookings</button>
                    <button onClick={() => onSelectContent("SelectBookingById")}>Select booking</button>
                </div>
            </>
        )
    }
}