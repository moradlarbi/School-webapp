import React from 'react'
import logo from "../../assets/logo.svg"
import school from "../../assets/school.png"
import Form from './Form'
import './styles.css'
const Signup = () => {
    return (
        <div className="signup-container">
            <div className="left">
                <div className="logo-container">
                    <img src={logo} className="logo" alt="logo"></img>
                    <div className="logo-text">lta</div>
                </div>
                <div className="image-container">
                    <img src={school} className="school" alt="school"></img>
                </div>
            </div>
            <div className="right">
                <Form />
            </div>
        </div>
    )
}

export default Signup
