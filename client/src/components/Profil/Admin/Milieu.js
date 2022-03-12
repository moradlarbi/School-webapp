import { useState, useEffect, useRef } from 'react'
import Niveau from './Niveau'
import axios from 'axios'
import "./styles2.css"
const Milieu = ({init, niveau, setNiveau, b, setB }) => {
    //request niveaux
    const didMountRef = useRef(false);
    const [c, setC] = useState(false)
    
    



useEffect(() => {
    if (didMountRef.current) {
        axios.post("http://localhost:8080/niveaux",niveau)
    }
    else {
        didMountRef.current = true
    }
}, [c])
useEffect(() => {
    if (didMountRef.current) {
        //console.log(niveau)
    }
    else {
        didMountRef.current = true
      }
},[])
useEffect(() => {
    setNiveau(niveau)
},[b])
const ajoute = () => {
    setNiveau([...niveau,{
        nom: "",
        profs: [],
        salles: [],
        matieres: [],
        events: []
    }])
}
    const sauv = () => {
        setC(!c)
    }
    useEffect(() => {
        const el = document.querySelector(".sauv-mssg")
        el.classList.add("visible")
        setTimeout(() => {
            el.classList.remove("visible")
        },10000)
    },[c])
    
    return (
        
        <div className="milieu-container">
            <div className="top-container">
                <div className="title">
                    Liste des niveaux
                </div>
                <div className="btns-contain">
                    <button className="btn-ajout" onClick={ajoute}>
                        Ajouter un niveau +
                    </button>
                    <button className="btn-sauv" onClick={sauv}>
                        Sauvegarde
                    </button>
                </div>
            </div>
            <div className="sauv-mssg">
                Les changement ont bien été sauvegardé
            </div>
            <div className="content">
                {
                    niveau !== [] && niveau.map((n,index) => {
                        return <Niveau info={niveau} index={index} setNiveau={setNiveau} init={init} />
                    })
                }
            </div>
        </div>
    )
}

export default Milieu
