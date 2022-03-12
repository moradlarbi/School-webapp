import { createContext, useState, useRef, useEffect } from 'react'
import Header from './Header'
import Milieu from './Milieu'
import Nav from './Nav'
import './styles2.css'

export const Context = createContext({
    nom: "",
    prenom: "",
    type: "",
    niveau: "",
    matiere: "",
    email: "",
    tel: "",
    pass: "",
    matiere: "",
    niveau: ""
})
const Admin = () => {
    const didMountRef = useRef(false);
    const [init, setInit] = useState({
        matieres: [],
        profs: [],
        salles: [],
        niveaux: []
    })
    const [userInfo, setUserInfo] = useState({
        nom: "",
        prenom: "",
        type: "",
        niveau: "",
        matiere: "",
        email: "",
        tel: "",
        pass: "",
        matiere: "",
        niveau: ""
    })
    const [niveau, setNiveau] = useState([])
    const [b, setB] = useState(false)
    useEffect(() => {
        fetch("http://localhost:8080/niveaux").then(res => {
            if (res.ok){
                return res.json()
            }
        })
        .then(jsonRes => {
            //console.log(jsonRes)
            if (jsonRes !== undefined){
                setNiveau(jsonRes)
                //console.log("niveau")
                //console.log(niveau)
                setB(!b)
            }
            
        })
      
    
  }, [didMountRef.current])
    useEffect(() => {
        fetch("http://localhost:8080/login").then(res => {
              if (res.ok){
                  return res.json()
              }
          })
          .then(jsonRes => {
              //console.log(jsonRes)
              if (jsonRes !== undefined){
                  if (jsonRes.err === ''){
                      setUserInfo({...userInfo,
                          id: jsonRes.id,
                          nom : jsonRes.nom,
                          prenom : jsonRes.prenom,
                          email : jsonRes.email,
                          pass : jsonRes.pass,
                          type : jsonRes.type,
                          tel: jsonRes.tel,
                          niveau: jsonRes.niveau,
                          matiere: jsonRes.matiere
                      })
                  }
              }
              
          })
      
    }, [])
    useEffect(() => {
        fetch("http://localhost:8080/init").then(res => {
            if (res.ok){
                return res.json()
            }
        })
        .then(jsonRes => {
            //console.log(jsonRes)
            if (jsonRes !== undefined){
                setInit(jsonRes)
            }
            
        })
      
    
    }, [didMountRef.current])
    return (
        <Context.Provider value={userInfo}>
            <div className="container-admin">
                <div className="left">
                    <Nav table={niveau}/>
                </div>
                <div className="right">
                    <Header />
                    <Milieu init={init} niveau={niveau} setNiveau={setNiveau} b={b} setB={setB} />
                </div>
            </div>
        </Context.Provider>
    )
}

export default Admin
