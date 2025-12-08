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
import CarCard from '../car-components/carcard/CarCard'
import UserByOwnId from '../user-components/userByOwnId/UserByOwnId'
import MyBookings from '../booking-components/mybookings/MyBookings'
import SelectBookingById from '../booking-components/selectbookingbyid/SelectBookingById'
import AddCar from '../car-components/addCar/AddCar'
import UpdateCar from '../car-components/updatecar/UpdateCar'
import AdminUpdateUser from '../user-components/updateuser/AdminUpdateUser'
import ViewBookings from '../booking-components/adminbookings/ViewBookings'
import UpdateBooking from '../booking-components/updatebooking/UpdateBooking'

export default function ContentArea({page, onSelectContent}){
    const {auth} = useAuth();

    const [car, setCar] = useState(null);
    const [carId, setCarId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [bookingId, setBookingId] = useState(null);

    const handleBookingSelectContent = (newPage, bookingId) => {
        setBookingId(bookingId);
        onSelectContent(newPage); 
    }

    const handleUserSelectContent = (newPage, userId) => {
        setUserId(userId);
        onSelectContent(newPage); 
    }
    const handleSelectCarIdContent = (newPage, carId) => {
        setCarId(carId);
        onSelectContent(newPage); 
    }

    const handleSelectContent = (newPage, car = null) => {
        setCar(car);
        onSelectContent(newPage); 
    };

    const renderPage = () => {
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
                    <AdminViewCard onSelectContent={handleSelectCarIdContent}/>
                )
            case "CarById":
                return(
                    <CarCard car={car} onSelectContent={onSelectContent}/>
                )
            case "UserByOwnId":
                return(
                    <UserByOwnId/>
                )
            case "UpdateUser":
                return(
                    <AdminUpdateUser onSelectContent={onSelectContent} userId={userId}/>
                )
            case "MyBookings":
                return(
                    <MyBookings/>
                )
            case "SelectBookingById":
                return(
                    <SelectBookingById/>
                )
            case "OrderCar":
                return(
                    <OrderCar car={car} onSelectContent={onSelectContent}/>
                )
            case "UsersAll":
                return(
                    <ViewUsers handleUserSelectContent={handleUserSelectContent}/>
                )
            case "AddCar":
                return(
                    <AddCar/>
                )
            case "UpdateCar":
                return(
                    <UpdateCar carId={carId} onSelectContent={onSelectContent}/>
                )
            case "ReturnCar":
                return(
                    <ReturnCar carId={carId}/>
                )
            case "GetBookings":
                return(
                    <ViewBookings handleBookingSelectContent={handleBookingSelectContent}/>
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
                    <UpdateBooking booking={bookingId} onSelectContent={onSelectContent}/>
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
    };

    return (
        <div className="contentarea">
            {renderPage()}
        </div>
    );
}
