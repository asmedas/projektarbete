import React, {useState} from 'react'
import Sidebar from '../sidebar/Sidebar'
import Advertisement from '../advertisement/Advertisement'
import ContentArea from '../contentarea/ContentArea'
import './MainLayout.css'

export default function MainLayout(){
    const [page, setPage] = useState("Home")

    const pageChangeHandler = (selectedPage) => {setPage(selectedPage)}
    
    return (
        <div className='mainlayout'>
            <Sidebar onSelectContent={pageChangeHandler}/>
            <ContentArea page={page} onSelectContent={pageChangeHandler}/>
            <Advertisement />
        </div>
    )
}