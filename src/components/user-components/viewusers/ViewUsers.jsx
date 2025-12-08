import React, {useState, useEffect} from 'react'
import DataTable from '../../tables/DataTable'
import { useAuth } from '../../auth/AuthProvider'
import GridWrapper from '../../gridWrapper/GridWrapper'
import ContentBox from '../../contentarea/ContentBox'

export default function ViewUsers(){
    const [users, setUsers] = useState([])
    const {authFetch} = useAuth()
    const [userId, setUserId] = useState(null);

    const handleDeleteClick = async () => {
        if(userId === null){
            alert("Please select a user to delete")
            return;
        }
        try {
            const response = await authFetch(`http://localhost:8080/api/v1/users/${userId}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            setUserId(null);
            alert("User deleted successfully");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const load = async () => {
        try {
            const res = await authFetch("http://localhost:8080/api/v1/users");
            if (!res.ok) throw new Error("Failed to fetch users");

            const data = await res.json();
            const sanitized = data.map(({ password, ...rest }) => rest);

            setUsers(sanitized);
        } catch (err) {
            console.error(err);
        }
        };

        load();
    
    }, []);

    return(
        <>
            <ContentBox>
                <h2>selected user {userId}</h2>
                <button onClick={handleDeleteClick}>Delete</button>
            </ContentBox><br />
            <DataTable data={users} setId={setUserId}/>
        </>
    )
}