import React from 'react'
import "./styles.css"
import logo from "../../assets/logo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'

import {  faCalendar, faPoll, faCog, faPaste } from '@fortawesome/free-solid-svg-icons'

library.add(faCalendar, faPoll, faCog, faPaste)
const Navleft = () => {
    const handleHover = function(e){
        e.target.classList.add("actif")
    }
    const handleHover2 = function(e){
        e.target.classList.remove("actif")
    }
    const handleResponsivity = function(){
        document.querySelector(".nav-respo").classList.toggle("respo")
        document.querySelector(".nav-container").classList.toggle("nav-container-respo")
        if (document.body.style.overflow === 'hidden'){
            document.body.style.overflow = 'auto'
        }
        else {
            document.body.style.overflow = 'hidden'
        }
        document.querySelector(".burger").classList.toggle("open")
    }
    return (
        <div className="nav-container">
            <nav>
                <div className="logo-container">
                    <img src={logo} className="logo" alt="logo">
                    </img>
                    <span className="logo-text">lta</span>
                </div>
                <div className="nav-respo">
                    <div className="burger-container">
                        <div className="burger" onClick={handleResponsivity}>
                            <div className="line line1"></div>
                            <div className="line line2"></div>
                            <div className="line line3"></div>
                        </div>
                    </div>
                    <ul className="list">
                        <li className="item" onMouseEnter={handleHover} onMouseLeave={handleHover2}>
                            <FontAwesomeIcon icon="paste" className="icon"/>
                            <a href="https://www.youtube.com/" className="link">
                                Modules
                            </a>

                        </li>
                        <li className="item actif">
                            <FontAwesomeIcon icon="calendar" className="icon"/>
                            <a href="https://www.youtube.com/" className="link">
                                EDT
                            </a>
                        </li>
                        <li className="item" onMouseEnter={handleHover} onMouseLeave={handleHover2}>
                            <FontAwesomeIcon icon="poll" className="icon"/>
                            <a href="https://www.youtube.com/" className="link">
                                Résultats
                            </a>
                        </li>
                        <li className="item" onMouseEnter={handleHover} onMouseLeave={handleHover2}>
                            <FontAwesomeIcon icon="cog" className="icon"/>
                            <a href="https://www.youtube.com/" className="link">
                                Paramètres
                            </a>
                        </li>
                    </ul>
                    <div className="logo-container">
                        <img src={logo} className="logo" alt="logo">
                        </img>
                        <span className="logo-text">lta</span>
                    </div>
                </div>
                
            </nav>
            
        </div>
    )
}

export default Navleft
