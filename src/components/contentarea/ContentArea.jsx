import React from 'react'
import './ContentArea.css'
import LoginPage from '../pages/login/LoginPage'
import { useAuth } from '../auth/AuthProvider'
import Home from '../home/Home'
import CustomerViewCard from '../car-components/CustomerViewCard'
import AdminViewCard from '../car-components/AdminViewCars'

export default function ContentArea({page, onSelectContent}){
    const {auth} = useAuth();

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
                <h1>new user component</h1>
            )
        case "ViewCars":
            return(
                <CustomerViewCard/>
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
                <h1>Order car component</h1>
            )
        case "UsersAll":
            return(
                <h1>List all users component</h1>
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
                <h1>Return car component</h1>
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
