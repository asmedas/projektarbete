import React, {useState} from 'react'

export default function AddUser({onSelectContent}){
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
        setRole(value === "yes" ? "admin" : "user");
    };

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


        const newUser = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            phone: phone,
            email: email,
            password: password,
            no_of_orders: 0,
            role: role
        };

        try{
            const response = await fetch("http://localhost:8080/api/v1/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })

            if(!response.ok){
                const errorText = await response.text();
                throw new Error(`Booking failed: ${response.status} - ${errorText}`);
            }
            console.log("User created! status:", response.status)
            alert("User created")
            onSelectContent("Home")
        } catch (error) {
            console.error("Creation of user has failed", error)
            alert("Failed to create a new user")
        }
    }

    return(
        <div className='form'>
            <h1>New User</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">Firstname</label>
                <input type="text" name="firstName" id="firstName" placeholder='Firstname'
                value={firstName} onChange={handleFirstNameInput}/>
                <label htmlFor="lastName">Lastame</label>
                <input type="text" name="lastName" id="lastName" placeholder='Lastname'
                value={lastName} onChange={handleLastNameInput}/>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder='Username'
                value={username} onChange={handleUsernameInput}/>
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" id="phone" placeholder='Phone'
                value={phone} onChange={handlePhoneInput}/>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" placeholder='Email'
                value={email} onChange={handleEmailInput}/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" placeholder='Password'
                value={password} onChange={handlePasswordInput}/>
                <label htmlFor="role">Admin, yes/no?</label>
                <input type="text" name="role" id="role" placeholder='Role'
                value={role} onChange={handleRoleInput}/>
                <button type='submit'>Create user</button>
            </form>
        </div>
    )
}