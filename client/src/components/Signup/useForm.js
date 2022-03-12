import { useState, useEffect } from 'react';
import validateInfo from './validation.js'


const useForm = () => {
  
const [values, setValues] = useState({
  nom: "",
  prenom: "",
  type: "",
  niveau: "",
  matiere: "",
  email: "",
  tel: "",
  pass: "",
  pass2: ""


});

  
  const [errors, setErrors] = useState({});
  

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

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
    console.log(newUser)
    //setErrors(validateInfo(values));
    
  };

  /*useEffect(
    () => {
      if (Object.keys(errors).length === 0 && (page == 1)) {
        callback();
      }
    },
    [errors]
  );*/

  return { handleChange, values, errors };
};

export default useForm;