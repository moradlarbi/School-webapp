import { useEffect, useState } from 'react'
import TimeTracking from './TimeTracking'
import Navleft from './Navleft'
import "./styles.css"

const EDT = () => {
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
        niveau: "",
        events: []
    })
    const [b, setB] = useState(false)
    useEffect(() => {
        fetch("http://localhost:8080/login").then(res => {
              if (res.ok){
                  return res.json()
              }
          })
          .then(jsonRes => {
              console.log(jsonRes)
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
                          matiere: jsonRes.matiere,
                          events: jsonRes.events
                      })
                  }
              }
              
          })
      
    })
    useEffect(() => {
        console.log(userInfo)
    },[b])
    return (
        <div className="container">
            <Navleft />
            <TimeTracking info={userInfo} />

        </div>
    )
}

export default EDT
