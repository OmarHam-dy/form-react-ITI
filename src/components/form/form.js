import './form.css';
import React, { useState } from 'react';

function Form() {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        username: '',
        pass: '',
        passConfirm: ''
    });
    const [error, setError] = useState({
        name: true,
        email: true,
        username: true,
        pass: true,
        passConfirm: true
    });
    

    const validate = function (event) {
        const val = event.target.value;

        setUserData({ ...userData, [event.target.name]: val });
        
        switch (event.target.name) {
            case 'name':
                if (val.length === 0)
                    setError({ ...error, name: true });
                else 
                    setError({ ...error, name: false });
                break;
            case 'email':
                if (val.length === 0 || !emailRegex.test(val))
                    setError({ ...error, email: true });
                else
                    setError({ ...error, email: false });
                break;
            case 'username':
                if (val.length === 0 || val.split(' ').length > 1)
                    setError({ ...error, username: true });
                else
                    setError({ ...error, username: false });
                break;
            case 'pass':
                if (val.length === 0 || !passwordRegex.test(val))
                    setError({ ...error, pass: true });
                else
                    setError({ ...error, pass: false });
                break;
            default:
                if (val !== userData.pass)
                    setError({ ...error, passConfirm: true });
                else
                    setError({ ...error, passConfirm: false });
                break;
        }
    }
    
    const tamam = error.name || error.email || error.username || error.pass || error.passConfirm;

    return ( 
        <div className="parent">
            <form action="">
                <label htmlFor="name" data-error='*required' style={{overflow: error.name? 'visible':'hidden'}} >Name</label>
                <input type="text" id='name' name='name' onChange={(e)=>{validate(e)}}/>
                
                <label htmlFor="em" data-error='Enter valid email' style={{overflow: error.email? 'visible':'hidden'}}>Email</label>
                <input type="text" id='em' name='email' onChange={(e)=>{validate(e)}}/>
                
                <label htmlFor="un" data-error='spaces is not allowed' style={{overflow: error.username? 'visible':'hidden'}}>Username</label>
                <input type="text" id='un' name='username'  onChange={(e)=>{validate(e)}}/>
                
                <label htmlFor="pass" data-error='Enter valid password' style={{overflow: error.pass? 'visible':'hidden'}}>Password</label>
                <input type="password" id='pass' name='pass' onChange={(e)=>{validate(e)}}/>
                
                <label htmlFor="con" data-error="The password didn't match" style={{overflow: error.passConfirm?'visible':'hidden'}}>Confirm Password</label>
                <input type="password" id='con'name='passConfirm'  onChange={(e)=>{validate(e)}}/>
                
            </form>
            <a href="" className={`${tamam? 'disable':''}`} >Register</a>
        </div>
    );
}

export default Form;