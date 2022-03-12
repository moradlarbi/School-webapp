import { useState } from 'react'
import "./styles.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import {  faCalendar, faPoll, faCog, faPaste, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

library.add(faCalendar, faPoll, faCog, faPaste, faCaretDown, faCaretUp)
const ElAffect = ({nom,table,icon,handleSet,clear1,clear2}) => {
    const [caret, setCaret] = useState(false)
    const handleClick = function(e){
        let el;
        if (e.target.classList.contains("icon2")){
            el = e.target.parentNode.parentNode
        }
        else {
            el = e.target.parentNode.parentNode.parentNode.parentNode

        }
        el.querySelector(".list-el").classList.toggle("open")
        setCaret(!caret)
    }
    const handleHover = function(e){
        e.target.classList.add("actif")
    }
    const handleHover2 = function(e){
        e.target.classList.remove("actif")
    }
    const hover1 = function(e){
        e.target.classList.add("actif")
    }
    const hover2 = function(e){
        e.target.classList.remove("actif")
    }
    const handleClick2 = (e)=> {
        handleSet(e.target.textContent)
        clear1("")
        clear2("")
        var el = document.querySelector(".stick")
        el.textContent = e.target.textContent

    }
    
    
    return (
        <div className="nav-el-container">
            <div className="title" onMouseEnter={hover1} onMouseLeave={hover2}>
                <FontAwesomeIcon icon={icon} className="icon"/>
                {nom}
                <span className="icon2" >
                    {
                        !caret && <FontAwesomeIcon icon={faCaretDown} onClick={handleClick}/>
                    }
                    {
                        caret && <FontAwesomeIcon icon={faCaretUp} onClick={handleClick}/>
                    }
                    
                    
                </span>
                
            </div>            
            <ul className="list-el">
            {
                    table.map((n) => {
                        return <li key={n} className="el" onMouseEnter={handleHover} onMouseLeave={handleHover2} draggable="true" onClick={handleClick2} >
                            {n}
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default ElAffect
