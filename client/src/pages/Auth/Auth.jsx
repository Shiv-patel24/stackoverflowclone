import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom' 

import './Auth.css'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth'

const Auth = () => {

    const [isSignup, setIsSignup] = useState(false)   ///change ture and check out "automaticalt login and signup change"
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSwitch = () => {
        setIsSignup (!isSignup)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email && !password){
            alert('Enter email and password')
        }
        if(isSignup){
            if(!name){
                alert("Enter a name to continue")
            }
            dispatch(signup({name, email, password}, navigate))
        }
        else{
            dispatch(login({email, password}, navigate))
        }
    }

  return (
    <section class='auth-section'>  
    { isSignup && <AboutAuth /> }
      <div class='auth-container-2'>
            { ! isSignup && < img src={icon} alt= 'stack overflow'  className='login-logo' /> }
            <form onSubmit={handleSubmit}>

                {
                    isSignup && (
                        <label htmlFor="name">
                            <h4 className='display'>Display Name</h4>
                            <input type="text" id='name' name='name' onChange={(e) => {setName(e.target.value)}} />
                        </label>
                    )

                }
                
                <label htmlFor="email">
                    <h4>Email</h4>
                    <input type="email" name='email' id='email' onChange={(e) => {setEmail(e.target.value)}} />
                </label>

                <label htmlFor='password'>
                    <div style={{display:"flex", justifyContent:"space-between"} }>
                         <h4>Password</h4>
                        { !isSignup && <p style={{color: '#007ac6', fontSize: '13px'}}>Forgot password</p> }
                    </div>
 
                    <input type="password" name='password' id='password' onChange={(e) => {setPassword (e.target.value)}} />
                </label>

                { isSignup && <p style={{fontFamily: '13px', color: '#666767'}}>Password must containe at least eight <br /> characters, incuding at least 3 letter and 1<br /> numbers</p>}

                {
                    isSignup && (
                        <label htmlFor='check'>
                            <input type="checkbox"  id ='check' />
                            <p style={{fontSize:"13px"}}>Opt-in to receive occasional<br/> product updates, user researcg <br />incitation, company antowncomestns, <br />and digests</p>
                        </label>
                    )
                }


                <button type='submit' className='auth-btn'>{ isSignup ? 'Sign up':"Log in"}</button>

                {
                    isSignup && (
                        <p style={{color: "#666767", fontSize: "13px"}}>
                            By clicking "Sign up", you agree to<br />  our   
                            <span style={{fontFamily: '13px', color: '#007ac6'}}> terms of service</span> ,
                            <span style={{fontFamily: '13px', color: '#007ac6'}}> privacy poicy,</span><br /> and 
                            <span style={{fontFamily: '13px', color: '#007ac6'}}> cookie policy</span>
                        </p> 
                    ) 
                }

            </form>
            <p>
                { isSignup ? 'Already have an account?' : "Don't have an account ?" }
                <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{ isSignup ?  "Log in" : 'Sign up' }</button>
            </p>
      </div>
    </section>
  )
}

export default Auth  
