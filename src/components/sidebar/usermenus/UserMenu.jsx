import React,{useState} from 'react'

export default function UserMenu({onSelectContent}){
    const [usersOpen, setUserOpen] = useState(false)

    if(!usersOpen){
        return(
            <button onClick={()=>setUserOpen(!usersOpen)}>
                Users {usersOpen ? "▲" : "▼"}
            </button>
        )
    }

    if(usersOpen){
        return(
            <>
                <button onClick={()=>setUserOpen(!usersOpen)}>
                    Users {usersOpen ? "▲" : "▼"}
                </button>
                <div className='submenu'>
                    <button onClick={() => onSelectContent("UserByOwnId")}>Get user by ID</button>
                    <button onClick={() => onSelectContent("UpdateUser")}>Update user</button>
                </div>
            </>
        )
    }
}