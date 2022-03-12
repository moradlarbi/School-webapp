import { useState, useEffect, useRef } from 'react'
import boy from "../../assets/boy-pencil.png"
import useForm from './useForm';
import Profil from '../Profil/Profil';
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import './styles.css'
import {  faArrowRight, faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowRight, faArrowLeft, faEye, faEyeSlash)
const Form = () => {
    const { handleChange, values, errors } = useForm(
        
    );
    const [matieres, setMatieres] = useState(["math","arabe","sport"])
    const [niveaux, setNiveaux] = useState(["1CP","2CP","1CS"])
    const [init, setInit] = useState({
        matieres: [],
        profs: [],
        salles: [],
        niveaux: []
    })
    const [eye, setEye] = useState(faEye)
    const [eye2, setEye2] = useState(faEye)
    const [ PassInputType, setPassInputType] = useState("password")
    const [ PassInputType2, setPassInputType2] = useState("password")
    const [cpt, setCpt] = useState(0)
    const [type, setType] = useState("admin")
    const [b,setB] = useState(false)
    const [err, setErr] = useState("")
    const [y,setY] = useState(0)
    const [redirect, setRedirect] = useState(false)
    const [userInfo, setUserInfo] = useState({
        nom: "",
        prenom: "",
        type: "",
        niveau: "",
        matiere: "",
        email: "",
        tel: "",
        pass: "",
        events: []
    })
    const didMountRef = useRef(false);
    const didMountRef2 = useRef(false);
    const next = () => {
        if (cpt === 2 && type === "admin"){
            setCpt(cpt+2)
        }
        else {
            if (cpt < 5){
                setCpt(cpt+1)
            }
        }
        
        
    }
    const prev = () => {
        if (cpt === 4 && type ==="admin"){
            setCpt(cpt-2)
        }
        else {
            if (cpt !== 0){
                setCpt(cpt-1)
            }
        }
        
        
    }
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
    const click2 = () => {
        if (PassInputType2 === "password"){
            setPassInputType2("text")
            setEye2(faEyeSlash)
        }
        if (PassInputType2 === "text"){
            setPassInputType2("password")
            setEye2(faEye)
        }
    }
    useEffect(() => {
        if (cpt > 0){
            var el = document.querySelector(".bar")
            if (el !== null){
                el.style.width = ((cpt/6)*100) + "%"
            }
        }
        
    }, [cpt])
    useEffect(() => {
        //console.log(values.type)
        if (values.type === "admin"){
            setType("admin")
        }
        if (values.type === "prof"){
            setType("prof")
        }
        if (values.type === "etudiant"){
            setType("etudiant")
        }

    }, [values.type])
    const handleSubmit = e => {
        e.preventDefault();
        const newUser = {
          nom: values.nom,
          prenom: values.prenom,
          type: values.type,
          niveau: values.niveau,
          matiere: values.matiere,
          email: values.email,
          tel: values.tel,
          pass: values.pass,
          pass2: values.pass2
        }
        const header = {
          'Content-Type': 'application/json',
        }
        setY(1)
        setB(axios.post("http://localhost:8080/users",newUser))
    
      };
      useEffect(() => {
          if (didMountRef.current){
            fetch("http://localhost:8080/users").then(res => {
                if (res.ok){
                    return res.json()
                }
            })
            .then(jsonRes => {
                console.log(jsonRes)
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
                        console.log(userInfo)
                    }
                }
                
            })
          }
          else {
            didMountRef.current = true
          }
        
      }, [b])
      useEffect(() => {
        if (didMountRef2.current) {
            if (userInfo.email !== "" && userInfo.email !== undefined){
                setRedirect(true)
            }
            
        }
        else {
            didMountRef2.current = true
          }
    },[userInfo])
    useEffect(() => {
        fetch("http://localhost:8080/init").then(res => {
            if (res.ok){
                return res.json()
            }
        })
        .then(jsonRes => {
            if (jsonRes !== undefined){
                setInit(jsonRes)
            }
            
        })
      
    
    }, [])
    useEffect(() => {
        setMatieres(init.matieres)
        setNiveaux(init.niveaux)
    },[init])
    if (redirect){

        return <Profil userInfo={userInfo}/>
        
    }
    else {
        return (
            <div className="form-container">
                {
                    cpt == 0 && 
                    <div className="first-layer">
                        <h1 className="title">
                            Creer un nouveau compte
                        </h1>
                        <button className="btn-debut" onClick={(e) => {
                                e.preventDefault()
                                next()
                            }}>
                                <div className="icon-container"> 
                                        <FontAwesomeIcon icon={faArrowRight} className="icon"/>
                                </div>
                                <div className="txt">
                                    Commencer
                                </div>
                                
                            </button>
                        <a href="../" className="link">
                            Vous avez deja un compte?
                        </a>
                    </div>
                }
                {
                    cpt > 0 &&
                    <div className="second-layer">
                        <div className="boy-container">
                            <div className="content">
                                <img src={boy} className="boy" alt="boy"></img>
                                <div className="bar-container">
                                    <div className="bar"></div>
                                </div>
                            </div>
                            
                        </div>
                        <form className="form-content" onSubmit={handleSubmit}>
                        
                        {
                            cpt > 1 && 
                            <button className="btn-prev" onClick={(e) => {
                                e.preventDefault()
                                prev()
                            }}>
                                <div className="icon-container"> 
                                    <FontAwesomeIcon icon={faArrowLeft} className="icon"/>
                                </div>
                            </button>
                        }
                        {
                            cpt === 1 &&
                            <div className="groupe">
                                <div className="container name-container">
                                    <label>
                                        Nom
                                    </label>
                                    <input 
                                        type="text" 
                                        name="nom"
                                        value={values.nom}
                                        onChange={handleChange} 
                                        placeholder="Nom *" 
                                        className="nom" 
                                        autoComplete="off" required/>
                                </div>
                                <div className="container prenom-container">
                                    <label>
                                        Prenom
                                    </label>
                                    <input 
                                        type="text" 
                                        name="prenom"
                                        value={values.prenom}
                                        onChange={handleChange} 
                                        placeholder="Prenom *" 
                                        className="prenom" 
                                        autoComplete="off" required/>
                                </div>
                            </div>
                            
                            
                        }
                        {
                            cpt === 2 &&
                            <div className="groupe">
                                <div className="container type-container">
                                    <label>
                                        Type de profil
                                    </label>
                                    <select name="type" 
                                    value={values.type} defaultValue='' onChange={handleChange}
                                    >
                                        <option value='' disabled className="none">Choisissez le type</option> 
                                        <option value="admin"> Administrateur </option>
                                        <option value="prof"> Enseignant </option>
                                        <option value="etudiant"> Etudiant </option>
                                    </select>
                                </div>
                                
                            </div>
                            
                            
                        }
                        {
                            cpt === 3 &&
                            <div className="groupe">
                                {
                                    type === "prof" &&
                                    <div className="container matiere-container">
                                        <label>
                                            Matiere
                                        </label>
                                        <select name="matiere" 
                                        value={values.matiere} defaultValue='' onChange={handleChange}
                                        >
                                            <option value='' disabled className="none">Choisissez une matiere</option> 
                                            {
                                                matieres.map((matiere) => {
                                                    return <option key={matiere} name={matiere} value={matiere}>
                                                        {matiere}
                                                    </option>
                                                })
                                            }
                                        </select>
                                    </div>}
                                {
                                    type === "etudiant" &&
                                    <div className="container matiere-container">
                                    <label>
                                        Niveau
                                    </label>
                                    <select name="niveau" 
                                    value={values.niveau} defaultValue='' onChange={handleChange}
                                    >
                                        <option value='' disabled className="none">Choisissez une niveau</option> 
                                        {
                                            niveaux.map((niveau) => {
                                                return <option key={niveau} name={niveau} value={niveau}>
                                                    {niveau}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>}
    
    
                            </div>
                            
                            
                        }
                        {
                            cpt === 4 &&
                            <div className="groupe">
                                <div className="container email-container">
                                    <label>
                                        Email
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange} 
                                        placeholder="Email *" 
                                        className="email" 
                                        autoComplete="off" required/>
                                </div>
                                <div className="container tel-container">
                                    <label>
                                            Numéro Téléphone
                                    </label>
                                    <input 
                                        type="text" 
                                        name="tel"
                                        value={values.tel}
                                        onChange={handleChange} 
                                        placeholder="Téléphone " 
                                        className="tel" 
                                        autoComplete="off" />
                                </div>
                            </div>
                            
                            
                        }
                        {
                            cpt === 5 &&
                            <div className="groupe">
                                <div className="container">
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
                                            autoComplete="off"
                                            className="pass" required/>
                                        <FontAwesomeIcon icon={eye} className="icn" onClick={click} /> 
                                    </div>            
                                    
                                </div>
                                <div className="container ">
                                    <label>Conrimer le mot de passe</label>
                                    <div className="pass-container">
                                        <input 
                                            type= {PassInputType2}
                                            name="pass2"
                                            value={values.pass2}
                                            onChange={handleChange} 
                                            placeholder="Confirmer le mot de passe" 
                                            autoComplete="off"
                                            className="pass2" required/>
                                        <FontAwesomeIcon icon={eye2} className="icn" onClick={click2} /> 
                                    </div>
                                    
                                </div>
                            </div>
                            
                            
                        }
                        {
                            cpt < 5 && cpt > 0 && 
                            <button className="btn-next" onClick={(e) => {
                                e.preventDefault()
                                next()
                            }}>
                                <div className="txt">
                                    Suivant
                                </div>
                                <div className="icon-container"> 
                                        <FontAwesomeIcon icon={faArrowRight} className="icon"/>
                                </div>
                            </button>
    
                        }
                        
                        {
                            cpt === 5 &&
                            <button type="submit" className="btn-submit" onClick={handleSubmit}>
                                Creer
                            </button>
                            
                        }
                        {
                            cpt === 5 && err !== "" && y===1 &&
                            <div className="err-message">
                                {err}
                            </div>
                            
                        }
    
                    </form>
                </div>}
                
                
                
            </div>
        )
    }
    
}

export default Form
