import './BookingsCard.css'

export default function BookingsCard({booking}){
    return(
        <div className='mybookingscard'>
            <h2>Booking ID: {booking.id}</h2>

            <p><strong>From date: </strong> {booking.fromDate}</p>
            <p><strong>To date: </strong> {booking.toDate}</p>
            <p><strong>User ID: </strong> {booking.userId}</p>
            <p><strong>Car ID: </strong> {booking.carId}</p>
            <p><strong>Active: </strong> {booking.active ? "yes" : "no"}</p>
        </div>
    )
}