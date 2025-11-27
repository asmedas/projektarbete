import React, {useState} from 'react'
import Sidebar from '../sidebar/Sidebar'
import Advertisement from '../advertisement/Advertisement'
import ContentArea from '../contentarea/ContentArea'
import './MainLayout.css'

function MainLayout(){
    const [page, setPage] = useState("")
    return (
        <div className='mainlayout'>
            <Sidebar />
            <ContentArea />
            <Advertisement />
        </div>
    )
}

export default MainLayout;