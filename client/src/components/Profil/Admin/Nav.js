import logo from "../../../assets/logo.svg"
import "./styles2.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { useState } from 'react'
import {Context} from "./Admin"
import { library } from '@fortawesome/fontawesome-svg-core'

import {  faCalendar, faPoll, faCog, faPaste, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useContext } from "react"

library.add(faCalendar, faPoll, faCog, faPaste, faCaretDown, faCaretUp)
const Nav = ({table}) => {
    const userIn = useContext(Context)
    const [caret, setCaret] = useState(false)
    const [caret2, setCaret2] = useState(false)
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
    const handleClick = (e) => {
        let el;
        if (e.target.classList.contains("icon2")){
            el = e.target.parentNode.parentNode
        }
        else {
            el = e.target.parentNode.parentNode.parentNode.parentNode

        }
        el.querySelector(".list-el1").classList.toggle("open")
        setCaret(!caret)
    }
    const handleClick2 = (e) => {
        let el;
        if (e.target.classList.contains("icon2")){
            el = e.target.parentNode.parentNode
        }
        else {
            el = e.target.parentNode.parentNode.parentNode.parentNode

        }
        el.querySelector(".list-el2").classList.toggle("open")
        setCaret2(!caret2)
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
                            <div className="title" onMouseEnter={handleHover} onMouseLeave={handleHover2}>
                                <FontAwesomeIcon icon="calendar" className="icon"/>
                                Affectation EDT
                                <span className="icon2" >
                                    {
                                        !caret && <FontAwesomeIcon icon={faCaretDown} onClick={handleClick}/>
                                    }
                                    {
                                        caret && <FontAwesomeIcon icon={faCaretUp} onClick={handleClick}/>
                                    }
                                    
                                    
                                </span>
                                
                            </div>            
                            <ul className="list-el list-el1">
                            {
                                    table.map((n) => {
                                        return <li key={n._id} className="el" onMouseEnter={handleHover} onMouseLeave={handleHover2} draggable="true" >
                                            <a href={"/admin:"+ userIn.id +"/affectation:"+n.nom}>
                                                {n.nom}
                                            </a>
                                        </li>
                                    })
                                }
                            </ul>

                        </li>
                        
                        <li className="item" onMouseEnter={handleHover} onMouseLeave={handleHover2}>
                            <div className="title" onMouseEnter={handleHover} onMouseLeave={handleHover2}>
                                <FontAwesomeIcon icon="paste" className="icon"/>
                                Mis a jour niveau
                                <span className="icon2" >
                                    {
                                        !caret2 && <FontAwesomeIcon icon={faCaretDown} onClick={handleClick2}/>
                                    }
                                    {
                                        caret2 && <FontAwesomeIcon icon={faCaretUp} onClick={handleClick2}/>
                                    }
                                    
                                    
                                </span>
                                
                            </div>            
                            <ul className="list-el list-el2">
                            {
                                    table.map((n) => {
                                        return <li key={n._id} className="el" onMouseEnter={handleHover} onMouseLeave={handleHover2} draggable="true" >
                                            <a href={"/admin:"+userIn.id+"/niveaux"}>
                                                {n.nom}
                                            </a>
                                        </li>
                                    })
                                }
                            </ul>

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

export default Nav
