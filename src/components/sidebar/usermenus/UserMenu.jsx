import React,{useState} from 'react'

export default function UserMenu({onSelectContent}){
    const [usersOpen, setUserOpen] = useState(false)

    if(!usersOpen){
        return(
            <button onClick={()=>setUserOpen(!usersOpen)}>
                Users {bookingsOpen ? "▲" : "▼"}
            </button>
        )
    }

    if(usersOpen){
        return(
            <>
                <button onClick={()=>setUserOpen(!usersOpen)}>
                    Users {bookingsOpen ? "▲" : "▼"}
                </button>
                <div className='subMenu'>
                    <button onClick={() => onSelectContent}></button>
                </div>
            </>
        )
    }
}
