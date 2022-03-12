import { useState, useEffect } from 'react'
import ElNiv from './ElNiv'
const Niveau = ({info,init,index,setNiveau}) => {

    // const [ inf,setInf] = useState(info)
    const [b, setB] = useState(false)
    const handleChange = (e) => {
        setNiveau(info.map((el) => {
            
            if (el === info[index]){
                return {
                    ...info[index],
                    nom: e.target.value
                }
            }
            else {
                return el
            }
            
        }))
        chg()
    }
    const chg = () => {
        setB(!b)
    }
    // useEffect(() => {
    //     console.log(info)
        
    // }, [b])
    return (
        <li>
            <form className="form-niveau">
                <input type="text" value={info[index].nom} onChange={handleChange} nom="nom" className="input">
                </input>
                <ElNiv info={info[index].matieres} tab={init.matieres} label="Matieres" i={1} chg={chg} b={b}/>
                <ElNiv info={info[index].profs} tab={init.profs} label="Profs" i={2} chg={chg} b={b} />
                <ElNiv info={info[index].salles} tab={init.salles} label="Salles" i={3} chg={chg} b={b} />
            </form>
        </li>
    )
}

export default Niveau
