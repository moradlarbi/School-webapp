import React from 'react'
import "./styles.css"
import logo from "../../assets/logo.svg"

import { useState, useEffect } from 'react'
import ElAffect from './ElAffect'

const Nav = ({setMatiere, setProf, setSalle, info }) => {
    
    // const handleResponsivity = function(){
    //     document.querySelector(".nav-respo").classList.toggle("respo")
    //     document.querySelector(".nav-container").classList.toggle("nav-container-respo")
    //     if (document.body.style.overflow === 'hidden'){
    //         document.body.style.overflow = 'auto'
    //     }
    //     else {
    //         document.body.style.overflow = 'hidden'
    //     }
    //     document.querySelector(".burger").classList.toggle("open")
    // }
    const [matieres, setMatieres] = useState([])
    const [enseignants, setEnseignants] = useState([])
    const [salles, setSalles] = useState([])
    useEffect(() => {
        document.querySelector(".nav-container").addEventListener("click",()=> {
            document.querySelector('.stick').textContent = ""
        })
    })
    useEffect(() => {
        setMatieres(info.matieres)
        setEnseignants(info.profs)
        setSalles(info.salles)
    },[info])
    return (
        <div className="nav-container">
            <nav>
                <div className="logo-container">
                    <img src={logo} className="logo" alt="logo">
                    </img>
                    <span className="logo-text">lta</span>
                </div>
                <div className="nav-respo">
                    
                    <ul className="list">
                        <div className="list-label">
                            Affectation par
                        </div>
                        <li className="item">
                            
                            <ElAffect nom="matiere" table={matieres} icon="paste" handleSet={setMatiere} clear1={setProf} clear2={setSalle}/>

                        </li>
                        <li className="item">
                            <ElAffect nom="enseignant" table={enseignants} icon="calendar" handleSet={setProf} clear1={setMatiere} clear2={setSalle}/>
                        </li>
                        <li className="item">
                            <ElAffect nom="salle" table={salles} icon="poll" handleSet={setSalle} clear1={setProf} clear2={setMatiere}/>
                            
                        </li>
                        
                    </ul>
                    
                </div>
                
            </nav>
            
        </div>
    )
}

export default Nav
