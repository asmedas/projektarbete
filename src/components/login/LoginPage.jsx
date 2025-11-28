import React, {useState} from 'react'
import './LoginPage.css'

function LoginPage(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState("")

    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:8080/api/v1/auth/login';
        
        try {

            const response = await fetch(url, {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.text();
            console.log("SUCCESS:", data);


            alert("Logged in: " + data);

        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    return (
        <div className='loginpage'>
            <h1>LoginPage</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" value={username} onChange={handleUsernameInput}/><br />
                <label htmlFor="password">Password: </label>
                <input type="text" name='password' id='password' value={password} onChange={handlePasswordInput} /><br />
                <button type='submit'>Login</button>
            </form>
            <h1>response: </h1>
        </div>
    )
}

export default LoginPage