import React, {useState, useEffect} from 'react'
import DataTable from '../../tables/DataTable'
import { useAuth } from '../../auth/AuthProvider'

export default function ViewUsers(){
    const [users, setUsers] = useState([])
    const {authFetch} = useAuth()

    useEffect(() => {
        const load = async () => {
        try {
            const res = await authFetch("http://localhost:8080/api/v1/users");
            if (!res.ok) throw new Error("Failed to fetch users");

            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        }
        };

        load();
    
    }, []);

    return(
        <DataTable data={users}/>
    )
}