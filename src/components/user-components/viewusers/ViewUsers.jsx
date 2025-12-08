import React, {useState, useEffect} from 'react'
import DataTable from '../../tables/DataTable'
import { useAuth } from '../../auth/AuthProvider'
import ContentBox from '../../contentarea/ContentBox'
import AdminUpdateUser from '../updateuser/AdminUpdateUser'

export default function ViewUsers({handleUserSelectContent}) {
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

    const handleUserSelectOnClick = (e) => {
        if(userId === null){
            alert("Please select a user to update")
            return;
        }
        handleUserSelectContent("UpdateUser", userId);
    }

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
                <button onClick={handleUserSelectOnClick}>Update</button>
            </ContentBox><br />
            <DataTable data={users} setId={setUserId}/>
        </>
    )
}