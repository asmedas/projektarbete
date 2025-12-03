import React, {useState} from 'react'
import './LoginPage.css'
import {useAuth} from '../../auth/AuthProvider'

function LoginPage({onSelectContent}){
    const {login} = useAuth();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)

    async function handleSubmit(e) {
        e.preventDefault();

        const result = await login(username, password);

        if (!result.success) {
        alert("Login failed");
        return;
        }
        onSelectContent("Home")

    }

    return (
        <div className='loginpage'>
            <h1>LoginPage</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label><br />
                <input type="text" name="username" id="username" placeholder='username'
                 value={username} onChange={handleUsernameInput}/><br />
                <label htmlFor="password">Password</label><br />
                <input type="text" name='password' id='password' placeholder='password'
                 value={password} onChange={handlePasswordInput} /><br />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginPage