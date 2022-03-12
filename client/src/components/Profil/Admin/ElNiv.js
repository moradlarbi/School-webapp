import { useState, useEffect} from 'react'
import "./styles2.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

library.add(faCaretDown, faCaretUp)

const ElNiv = ({info,tab,label,i,b}) => {
    const [table, setTable] = useState([])
    const [c, setC] = useState(false)
    const [caret, setCaret] = useState(false)
    const handleClick = (e) => {
        let el;
        if (e.target.classList.contains("icon2")){
            el = e.target.parentNode.parentNode
        }
        else {
            el = e.target.parentNode.parentNode.parentNode.parentNode
        }
        var cl = ".list-el"+i
        el.querySelector(cl).classList.toggle("open")
        setCaret(!caret)
    }
    const handleHover = function(e){
        e.target.classList.add("actif")
    }
    const handleHover2 = function(e){
        e.target.classList.remove("actif")
    }
    const handleChange = function(e){
        let t = []
        const list = e.target.parentNode.parentNode.querySelectorAll(".el")
        for (let cpt=0;cpt<list.length;cpt++){
            if (list[cpt] === e.target.parentNode){
                const label = list[cpt].querySelector("label").textContent
                if (info.includes(label)){
                    let ind = info.indexOf(label)
                    info.splice(ind,1)
                }
                else {
                    info.push(label)
                }
                
                t[cpt] = !table[cpt]
            }
            else {
                t[cpt]= table[cpt]
            }
        }
        setTable(t)
        setC(!c)
    }
    useEffect(() => {
        let cpt =0;
        tab.forEach(e => {
            if (info.includes(e)){
                table[cpt] = true
            }
            else {
                table[cpt] = false
            }
            cpt++
        })
    },[b,c])
    return (
        <div className="item">
            <div className="title" onMouseEnter={handleHover} onMouseLeave={handleHover2}>
                <FontAwesomeIcon icon="calendar" className="icon"/>
                { label}
                <span className="icon2" >
                    {
                        !caret && <FontAwesomeIcon icon={faCaretDown} onClick={handleClick}/>
                    }
                    {
                        caret && <FontAwesomeIcon icon={faCaretUp} onClick={handleClick}/>
                    }
                    
                    
                </span>
                
            </div>            
            <ul className={"list-el list-el"+i}>
            {
                    tab !== undefined && tab.map((n,i) => {
                        return <div className="el" key={n}>
                            <label className="label">{n}</label>
                            <input  type="checkbox" className="check" checked={table[i]} onChange={handleChange} >
                            </input>
                        </div>
                        
                    })
                }
            </ul>
        </div>
    )
}

export default ElNiv
