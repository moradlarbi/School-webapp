import { useState, useEffect } from 'react'
import Nav from './Nav'
import EDT from './EDT'
import axios from "axios"
import "./styles.css"


const Affectation = (props) => {
    const [prof, setProf] = useState("")
    const [salle, setSalle] = useState("")
    const [matiere, setMatiere] = useState("")
    const [b, setB] = useState(false)
    const [info, setInfo] = useState({
        nom: "",
        matieres: [],
        profs: [],
        salles: [],
        events: []
    })
    useEffect(() => {
        document.addEventListener('mousemove', function(ev){
            let el = document.querySelector('.stick');
            if (el !== null){
                el.style.transform = 'translateY('+(ev.clientY+15)+'px)';
                el.style.transform += 'translateX('+(ev.clientX-35)+'px)';
            }
                        
        },false);
    },[])
    useEffect(async () => {
        // const res = await axios.get("",{
        //     params: {
        //         nom: props.match.params.class
        //     }
        // })
        let nom = props.match.params.class
        nom = nom.substring(1,nom.length)
        fetch(`http://localhost:8080/niveaux/class?nom=${nom}`)
        .then(res => {
            if (res.ok){
                return res.json()
            }
        })
        .then(jsonRes => {
            setInfo({
                ...info,
                nom: jsonRes.nom,
                matieres: jsonRes.matieres,
                profs: jsonRes.profs,
                salles: jsonRes.salles,
                events: jsonRes.events
            })
            setB(!b)
        })
        
        
    },[])
    useEffect(() => {
        setInfo(info)
        console.log(info)
    },[b])

    return (
        <div className="container">
            <Nav setMatiere={setMatiere} setProf={setProf} setSalle={setSalle} info={info} />
            <EDT matiere={matiere} prof={prof} salle={salle} info={info} />
            <div className="stick"></div>
        </div>
    )
}

export default Affectation
