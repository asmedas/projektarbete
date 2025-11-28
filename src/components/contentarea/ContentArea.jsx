import React from 'react'
import './ContentArea.css'
import LoginPage from '../login/LoginPage'

export default function ContentArea({page}){

    switch(page){
        case "Home":
            return (
                <>
                </>   
            )
        case "Login":
            return (
                <div className='contentarea'>
                    <LoginPage/>
                </div>
            )
        case "Profile":
            return (
                <div className='contentarea'>
                    Profile page
                </div>
            )
        case "Settings":
            return (
                <div className='contentarea'>
                    Settings page
                </div>
            )
        default:
            return (
                <>
                </> 
            )
    }
}
