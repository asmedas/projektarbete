import React from 'react'
import './ContentArea.css'
import LoginPage from '../pages/login/LoginPage'
import { useAuth } from '../auth/AuthProvider'
import Home from '../home/Home'

export default function ContentArea({page, onSelectContent}){
    const {auth} = useAuth();

    switch(page){
        case "Home":
            return (
                <Home/>
            )
        case "Login":
            return (
                <div className='contentarea'>
                    <LoginPage onSelectContent={onSelectContent}/>
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
                <Home/>
            )
    }
}
