import React, {useState} from 'react'
import './ContentArea.css'
import LoginPage from '../pages/login/LoginPage'
import { useAuth } from '../auth/AuthProvider'
import Home from '../home/Home'
import CustomerViewCard from '../car-components/CustomerViewCard'
import AdminViewCard from '../car-components/AdminViewCars'
import OrderCar from '../car-components/ordercar/OrderCar'
import ReturnCar from '../car-components/returncar/ReturnCar'
import AddUser from '../user-components/adduser/AddUser'
import ViewUsers from '../user-components/viewusers/ViewUsers'

export default function ContentArea({page, onSelectContent}){
    const {auth} = useAuth();

    const [car, setCar] = useState(null);

    const handleSelectContent = (newPage, car = null) => {
        setCar(car);
        onSelectContent(newPage); 
    };

    switch(page){
        case "Home":
            return (
                <Home/>
            )
        case "Login":
            return (
                <LoginPage onSelectContent={onSelectContent}/>
            )
        case "NewUser":
            return(
                <AddUser onSelectContent={onSelectContent}/>
            )
        case "ViewCars":
            return(
                <CustomerViewCard onSelectContent={handleSelectContent}/>
            )
        case "AdminViewCars":
            return(
                <AdminViewCard/>
            )
        case "CarById":
            return(
                <h1>View car by ID component</h1>
            )
        case "UserById":
            return(
                <h1>User by ID component</h1>
            )
        case "UpdateUser":
            return(
                <h1>Update User component</h1>
            )
        case "MyBookings":
            return(
                <h1>My Bookings component</h1>
            )
        case "SelectBookingById":
            return(
                <h1>Select booking by ID component</h1>
            )
        case "OrderCar":
            return(
                <OrderCar car={car} onSelectContent={onSelectContent}/>
            )
        case "UsersAll":
            return(
                <ViewUsers/>
            )
        case "DeleteUser":
            return(
                <h1>Delete selected user component</h1>
            )
        case "AddCar":
            return(
                <h1>Add car component</h1>
            )
        case "UpdateCar":
            return(
                <h1>Update car component</h1>
            )
        case "ReturnCar":
            return(
                <ReturnCar/>
            )
        case "DeleteCar":
            return(
                <h1>Delete car component</h1>
            )
        case "GetBookings":
            return(
                <h1>View all cookings component</h1>
            )
        case "GetActiveBookings":
            return(
                <h1>View all active bookings component</h1>
            )
        case "GetBookingsById":
            return(
                <h1>Get specific booking by booking-Id component</h1>
            )
        case "UpdateBooking":
            return(
                <h1>Update booking component</h1>
            )
        case "DeleteBooking":
            return(
                <h1>Delete booking component</h1>
            )
        default:
            return (
                <Home/>
            )
    }
}
