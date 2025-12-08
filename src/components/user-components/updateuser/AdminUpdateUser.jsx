import React, {useEffect, useState} from 'react'
import { useAuth } from "../../auth/AuthProvider";

export default function AdminUpdateUser({onSelectContent, userId}){
    const {auth, authFetch, updateUser} = useAuth()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    const handleFirstNameInput = (e) => setFirstName(e.target.value)
    const handleLastNameInput = (e) => setLastName(e.target.value)
    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handlePhoneInput = (e) => {
        const numeric = e.target.value.replace(/\D/g, "")
        setPhone(numeric)
    }
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)
    const handleRoleInput = (e) => {
        const value = e.target.value.toLowerCase();
        setRole(value);
    };

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const response = await authFetch(`http://localhost:8080/api/v1/users/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setFirstName(data.firstName || "");
                setLastName(data.lastName || "");
                setUsername(data.username || "");
                setPhone(data.phone || "");
                setEmail(data.email || "");
                setPassword("");
                setRole(data.role === "admin" ? "yes" : "no");
            } catch (error) {
                console.error("Couldn't load user data", error);
            }
        };

        loadUserData();
    }, [userId, authFetch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            alert("Please enter a valid email like: user@example.com")
            return;
        }
        if(phone.length !== 10){
            alert("Phone number must be 10 numbers long")
            return;
        }
        if(password > 64){
            alert("Password can't be longer than 64 characters")
            return;
        }


        const updatedUser = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            phone: phone,
            email: email,
            password: password,
            noOfOrders: 0,
            role: role === "yes" ? "admin" : null

        };

        try{
            const response = await authFetch(`http://localhost:8080/api/v1/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser)
            })

            if(!response.ok){
                const errorText = await response.text();
                throw new Error(`Booking failed: ${response.status} - ${errorText}`);
            }
            if(auth.id === userId){
                updateUser(updatedUser, userId)
            }
            console.log("User updated!", response.status)
            alert("User updated")
            onSelectContent("ViewUsers")
        } catch (error) {
            console.error("Couldn't update user", error)
            alert("Failed to update user")
        }
    }

    return(
        <div className='form'>
            <h1>Update User {userId}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">Firstname</label>
                <input type="text" name="firstName" id="firstName" placeholder={firstName}
                value={firstName} onChange={handleFirstNameInput}/>
                <label htmlFor="lastName">Lastame</label>
                <input type="text" name="lastName" id="lastName" placeholder={lastName}
                value={lastName} onChange={handleLastNameInput}/>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder={username}
                value={username} onChange={handleUsernameInput}/>
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" id="phone" placeholder={phone}
                value={phone} onChange={handlePhoneInput}/>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" placeholder={email}
                value={email} onChange={handleEmailInput}/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" placeholder='New password'
                value={password} onChange={handlePasswordInput}/>
                {auth.isAdmin && (
                    <>
                        <label htmlFor="role">Admin, yes/no?</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="yes"
                                    checked={role === "yes"}
                                    onChange={handleRoleInput}
                                /> 
                                Yes (Admin)
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="no"
                                    checked={role === "no"}
                                    onChange={handleRoleInput}
                                /> 
                                No (User)
                            </label>
                        </div>
                    </>
                )}
                <button type='submit'>Update user</button>
            </form>
        </div>
    )
}