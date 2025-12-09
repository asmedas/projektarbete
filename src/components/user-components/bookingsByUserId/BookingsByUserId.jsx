import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import BookingsCard from "../../booking-components/bookingscard/BookingsCard";
import GridWrapper from "../../gridWrapper/GridWrapper";
import ContentBox from "../../contentarea/ContentBox";

export default function BookingsByUserId(){
    const { auth, authFetch } = useAuth();
    const [userId, setUserId] = useState(auth.id);
    const [bookings, setbookings] = useState(null);


    const load = async () => {
            try {
                const res = await authFetch(`http://localhost:8080/api/v1/bookings/user/${userId}`);
                if (res.status === 404) {
                    setbookings([]);
                    return;
                }
                
                if (!res.ok) throw new Error("Failed to fetch user");

                const data = await res.json();
                setbookings(data);
            } catch (err) {
                console.error(err);
            }
        };

    if (!bookings) return (
        <ContentBox>
            <input type="text" placeholder="Search by UserId" value={userId}
                    onChange={(e) => setUserId(e.target.value)}/>
            <button onClick={load}>Search</button>
        </ContentBox>
    );

    return (
        <>
            <ContentBox>
                <label htmlFor="userId">UserId: </label>
                <input type="text" placeholder="Search by UserId" value={userId}
                        onChange={(e) => setUserId(e.target.value)}/>
                <button onClick={load}>Search</button>
            </ContentBox><br />
            <GridWrapper>
                {bookings.length === 0 && <p>No bookings found for user ID {userId}.</p>}
                {bookings.map(booking => (
                    <BookingsCard key={booking.id} booking={booking} />
                ))}
            </GridWrapper> 
        </>
    );
}