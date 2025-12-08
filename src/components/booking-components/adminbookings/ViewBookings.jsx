import React, {useState, useEffect} from 'react'
import { useAuth } from '../../auth/AuthProvider'
import DataTable from '../../tables/DataTable'
import ContentBox from '../../contentarea/ContentBox'
import GridWrapper from '../../gridWrapper/GridWrapper'

export default function ViewBookings({handleBookingSelectContent}){
    const {auth, authFetch} = useAuth()
    const [bookings, setBookings] = useState([])
    const [bookingId, setBookingId] = useState(null)
    const [showActive, setShowActive] = useState(false)
    const [idFilter, setIdFilter] = useState("")
    const [userIdFilter, setUserIdFilter] = useState("")

    const load = async () => {
            try{
                const res = await authFetch("http://localhost:8080/api/v1/bookings")
                if(!res.ok){
                    throw new Error("Failed to fetch bookings")
                }
                const data = await res.json()
                setBookings(data)
            }catch(error){
                console.error(error)
            }
        }

    const toggleShowActive = () => {
        setShowActive(!showActive);
        if(!showActive){
            const loadActive = async () => { 
                try{
                    const res = await authFetch("http://localhost:8080/api/v1/bookings/active")
                    if(!res.ok){
                        throw new Error("Failed to fetch bookings")
                    }
                    const data = await res.json()
                    setBookings(data)
                }catch(error){
                    console.error(error)
                }
            }
            loadActive()
        } else{
            load()
        }
    }

    const returnCar = async (e) => {
        e.preventDefault()
        if(auth.isAdmin){
            const response = await authFetch(`http://localhost:8080/api/v1/bookings/return/${bookingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(!response){
                alert("failed to return car")
                return
            }
            alert("car returned")
            load()

        }
    }

    const filteredBookings = bookings.filter(bookings => {
        const matchesName = bookings.id.toString().includes(idFilter);
        const matchesType = bookings.userId.toString().includes(userIdFilter);
        return matchesName && matchesType;
    });

    const updateBooking = () => {
        if(bookingId === null){
            alert("Please select a booking to update")
            return;
        }
        if(bookings.find(b => b.id === bookingId).isActive === false){
            alert("Cannot update an inactive booking")
            return;
        }
        handleBookingSelectContent("UpdateBooking", bookings.find(b => b.id === bookingId));
    }

    const deleteBooking = async () => {
        if(bookingId === null){
            alert("Please select a booking to delete")
            return;
        }
        if(!auth.isAdmin){
            alert("Only admins can delete bookings")
            return;
        }
        const response = await authFetch(`http://localhost:8080/api/v1/bookings/${bookingId}`, {
            method: "DELETE"
        });
        if(!response.ok){
            alert("failed to delete booking")
            return
        }
        alert("booking deleted")
        load()
    }

    useEffect(()=>{
        load()
    }, [authFetch])

    return(
        <>
            <ContentBox>
                <h2>selected booking {bookingId}</h2><br />
                <button onClick={returnCar}>Return car</button>
                <button onClick={updateBooking}>Update booking</button>
                <button onClick={deleteBooking}>Delete booking</button>
            </ContentBox><br />
            <ContentBox>
                <input type="text" placeholder="Filter by id" value={idFilter}
                    onChange={(e) => setIdFilter(e.target.value)}/>
                <input type="text" placeholder="Filter by userId" value={userIdFilter}
                    onChange={(e) => setUserIdFilter(e.target.value)}/>
                {showActive ? 
                    <button onClick={toggleShowActive}>Show all bookings</button> 
                    : 
                    <button onClick={toggleShowActive}>Show only active bookings</button>
                }
            </ContentBox><br />
            <DataTable data={filteredBookings} setId={setBookingId}/>
        </>
    )
}