import React, {useState} from 'react'
import Sidebar from '../sidebar/Sidebar'
import Advertisement from '../advertisement/Advertisement'
import ContentArea from '../contentarea/ContentArea'
import './MainLayout.css'

function MainLayout(){
    const [page, setPage] = useState("")

    const pageChangeHandler = (selectedPage) => {setPage(selectedPage)}
    
    return (
        <div className='mainlayout'>
            <Sidebar onSelectContent={pageChangeHandler}/>
            <ContentArea page={page}/>
            <Advertisement />
        </div>
    )
}

export default MainLayout;