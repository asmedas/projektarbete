import React from 'react';
import './Header.css'
import KoncernensLogga from '../../assets/KoncernensLogga.png'


function Header(){
    return(
        <header className='header'>
            <img className="logo" src={KoncernensLogga} alt="logga" />
            <h1>Wigells biluthyrning</h1>
        </header>
    )
}

export default Header;