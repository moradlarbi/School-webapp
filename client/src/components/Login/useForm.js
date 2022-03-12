import { useState, useEffect } from 'react';

const useForm = () => {
  
const [values, setValues] = useState({
  email: "",
  pass: ""


});

  
  const [errors, setErrors] = useState({});
  

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
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