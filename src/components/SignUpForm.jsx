import { HourglassEmpty } from '@material-ui/icons';
import React, { useState } from 'react';


const SignUpForm = () => {
    const [username, setUsername]= useState('');
    const [userSecret, setuserSecret]= useState('');
    const [confirmuserSecret, setConfirmuserSecret]= useState('');
    const [firstname, setFirstName]= useState('');
    const [lastname, seLastName]= useState('');
    const [errors, setError] = useState('');

    const handleSignUp = async(e) => { 
        e.preventDefault();
         if(username, firstname, lastname, userSecret, confirmuserSecret == ''){
                alert("All fields is required");
            } else if(Number(username, firstname, lastname)){
                alert("Name must be Alphabet");
            } else if(userSecret != confirmuserSecret ){
                alert("Confirm password did't matched")
            } else {
                 var axios = require('axios');     
                    var data = JSON.stringify
                            ({"username":username,
                            "secret":userSecret,
                            "first_name":firstname,
                            "last_name":lastname});

                        var config = {
                            method: 'post',
                            url: 'https://api.chatengine.io/users/',
                            headers: { 
                                'PRIVATE-KEY': 'd7f6a7fc-e9b2-4d46-92f4-ac38fdb3ed15', 
                                'Content-Type': 'application/json',
                            }, data : data 
                        };

                        axios(config)
                        .then(function (response) {
                            var dataChat = JSON.stringify({"title":"Chat room","admin_username":username});
                            var config = {
                            method: 'post',
                            url: 'https://api.chatengine.io/chats/',
                            headers: { 
                                'Project-ID': '9c946fa3-d11b-4514-90c2-29cb05dac580', 
                                'User-Name': username, 
                                'User-Secret': userSecret, 
                                'Content-Type': 'application/json'
                            }, data : dataChat
                            };
                                axios(config)
                                    alert("Registration successful");
                                    window.location.reload();
                            })

                    .catch(function (error) {
                        {error.status= 400 ? alert("Username already taken") : alert(error)  }
                                                   
                    });
            }
       

        
        }
            

            return (
                <div>
                    <div align="center"> 
                    <form onSubmit={handleSignUp}>
                            <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} className="input" placeholder="Username" />
                            {errors.username && <span>{errors}</span>}
                            <input type="text" name="firstname" value={firstname} onChange={(e)=>setFirstName(e.target.value)} className="input" placeholder="First name" />
                               {errors.exampleRequired && <span>This field is required</span>}
                            <input type="text" name="lastname" value={lastname} onChange={(e)=>seLastName(e.target.value)} className="input" placeholder="Last name" />
                               {errors.exampleRequired && <span>This field is required</span>}
                            <input type="password" name="userSecret" value={userSecret} onChange={(e)=>setuserSecret(e.target.value)} className="input" placeholder="Password" />
                               {errors.exampleRequired && <span>This field is required</span>}
                            <input type="password" name="confirmuserSecret" value={confirmuserSecret} onChange={(e)=>setConfirmuserSecret(e.target.value)} className="input" placeholder="confirm password" />
                               {errors.exampleRequired && <span>This field is required</span>}
                            <div align="center"> 
                                <button type="submit" className="button">
                                    <span>Sign up</span>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            );
        }

export default SignUpForm;
