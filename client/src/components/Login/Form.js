import React from 'react'
import { useState, useEffect, useRef } from 'react'
import boy from "../../assets/boy-pencil.png"
import useForm from './useForm';
import Profil from '../Profil/Profil';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import {   faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
library.add( faEye, faEyeSlash)
const Form = () => {
    const { handleChange, values, errors } = useForm();
    const [eye, setEye] = useState(faEye)
    const [ PassInputType, setPassInputType] = useState("password")
    const [b,setB] = useState(false)
    const [err, setErr] = useState("")
    const [y,setY] = useState(0)
    const [redirect, setRedirect] = useState(false)
    const [url, setUrl] = useState("/")
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
    const didMountRef = useRef(false);
    const didMountRef2 = useRef(0);
    const click = () => {
        if (PassInputType === "password"){
            setPassInputType("text")
            setEye(faEyeSlash)
        }
        if (PassInputType === "text"){
            setPassInputType("password")
            setEye(faEye)
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        const newUser = {
          email: values.email,
          pass: values.pass
        }
        
        setY(!y)
        setB(axios.post("http://localhost:8080/login",newUser))

      };
      useEffect(() => {
        if (didMountRef.current){
          fetch("http://localhost:8080/login").then(res => {
              if (res.ok){
                  return res.json()
              }
          })
          .then(jsonRes => {
              if (jsonRes !== undefined){
                  setErr(jsonRes.err)
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
                    setY(!y)
                    
                      //setUrl("/"+jsonRes.type+":"+jsonRes.id)
                      //console.log(url)
                      //history.push(url)
                  }
              }
              
          })
          .then(() => {
              console.log(userInfo)
            setY(!y)
          })
        }
        else {
          didMountRef.current = true
        }
      
    }, [b])
    useEffect(() => {
        if (didMountRef2.current > 1) {
            console.log(userInfo)
            if (userInfo.email !== "" && userInfo.email !== undefined){
                setRedirect(true)
            }
            
        }
        else {
            didMountRef2.current += 1
          }
    },[y])
    if (redirect){
        return <Profil userInfo={userInfo} />
    }
    else {
        return (
            <div className="form-container">
                <div className="boy-container">
                    <div className="content">
                        <img src={boy} className="boy" alt="boy"></img>
                        <div className="bar-container">
                            <div className="bar"></div>
                        </div>
                    </div>
                    
                </div>
                <form className="form-content" onSubmit={handleSubmit}>
                    <div className="groupe">
                        <div className="email-container">
                            <label>
                                Email
                            </label>
                            <input 
                                type="text" 
                                name="email"
                                value={values.email}
                                onChange={handleChange} 
                                placeholder="Email *" 
                                className="email" 
                                autocomplete="off" required/>
                        </div>
                        <div className="container-mp">
                            <label>
                                Mot de passe
                            </label>
                            <div className="pass-container">
                                <input 
                                    type= {PassInputType}
                                    name="pass"
                                    value={values.pass}
                                    onChange={handleChange}
                                    placeholder="Mot de passe" 
                                    className="pass" required/>
                                <FontAwesomeIcon icon={eye} className="icn" onClick={click} /> 
                            </div>  
                        </div>
                    </div>
                    <button type="submit" className="btn-submit">
                        Se connecter
                    </button>
                    {
                        err !== "" &&
                        <div className="err-message">
                            {err}
                        </div>
                    }
                    <div className="footer">
                        <a className="link" href="./signup">
                            Vous n'avez pas de compte?
                        </a>
                    </div>
                    
                </form>
            </div>
        )
    }
    
}

export default Form
