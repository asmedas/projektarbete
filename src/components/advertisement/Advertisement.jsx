import React from 'react'
import './Advertisement.css'
import Audiadd from '../../assets/Audiadd.png';
import BMWadd from '../../assets/BMWadd.png';
import Mercedesadd from '../../assets/Mercedesadd.png';
import Volkswagenadd from '../../assets/Volkswagenadd.png';


export default function Advertisement (){
    return (
        <div className='advertisement'>
            <a href='https://www.bmw.com/en/index.html' target="_blank" rel="noreferrer">
                <img src={BMWadd} alt="Audi Advertisement" className='ad-image'/>
            </a>
            <a href='https://www.mercedes-benz.com/en/' target="_blank" rel="noreferrer">
                <img src={Mercedesadd} alt="Audi Advertisement" className='ad-image'/>
            </a>
            <a href='https://www.audi.com/en/' target="_blank" rel="noreferrer">
                <img src={Audiadd} alt="Audi Advertisement" className='ad-image'/>
            </a>
            <a href='https://www.volkswagen.se/sv.html' target="_blank" rel="noreferrer">
                <img src={Volkswagenadd} alt="Audi Advertisement" className='ad-image'/>
            </a>
        </div>
    )
}