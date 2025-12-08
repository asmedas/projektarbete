import React, {useState} from 'react'

export default function AdminUserMenu({onSelectContent}){
    const [usersOpen, setUsersOpen] = useState(false);

    if(usersOpen){
        return(
        <>
            <button onClick={() => setUsersOpen(!usersOpen)}>
            Users {usersOpen ? "▲" : "▼"}
            </button>

            <div className="submenu">
                <button onClick={() => onSelectContent("UsersAll")}>All Users</button>
                <button onClick={() => onSelectContent("NewUser")}>New user</button>
            </div>
        </>
        )
        
    }
    if(!usersOpen){
        return(
            <button onClick={() => setUsersOpen(!usersOpen)}>
            Users {usersOpen ? "▲" : "▼"}
            </button>
        )
    }
}