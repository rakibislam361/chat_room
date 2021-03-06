import React, { useState } from 'react';
import axios from 'axios';
import SignUpForm from './SignUpForm';

const LoginForm = (history) => {
    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const authObject = {'Project-ID': "9c946fa3-d11b-4514-90c2-29cb05dac580", 'User-Name': username, 'User-Secret': password }
        try {
           await axios.get('https://api.Chatengine.io/chats', {headers : authObject});
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
        } catch (error) {
            setError('Oops, incorrect credentials.');
        }
    
    }

    const handleSignup = () => {
        document.getElementById('login').style.display='none';
        document.getElementById('signup').style.display='block';
    }
    
    const handleLogin = () => {
        document.getElementById('login').style.display='block';
        document.getElementById('signup').style.display='none';
    }

    return(
        <div className="wrapper">
            <div className="form" id="login">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className="input" placeholder="Username" required />
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center"> 
                        <button type="submit" className="button">
                            <span>Start Chatting</span>
                        </button>
                        <h2 className="error">{error}</h2>
                        <div onClick={handleSignup}><span style={{ cursor:'pointer'}}> Create new account</span></div>
                    </div>
                </form>
            </div>
            <div className="form" id="signup" style={{ display:'none'}}>
                <h1 className="title">Chat Application</h1>
                <div align="center"> 
                    <SignUpForm />
                    <div onClick={handleLogin}><span style={{ cursor:'pointer'}}>Back to Login page</span></div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm

