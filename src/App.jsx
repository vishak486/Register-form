import { useState } from 'react'
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, Button } from '@mui/material'

import './App.css'

function App() {

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")

  const [isNameIsValid, setIsNameIsValid] = useState(false)
  const [isEmailIsValid, setIsEmailIsValid] = useState(false)
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isGenderValid, setIsGenderValid] = useState(false);
  const [isDobValid, setIsDobValid] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const userInputValidation = (inputData) => {

    const { name, value } = inputData
    console.log(name, value);

    if (name == "fullName") {
      setFullName(value)
      !!value.match(/^[a-zA-Z\s]+$/) ? setIsNameIsValid(false) : setIsNameIsValid(true)
    }
    else if (name == "email") {
      setEmail(value);
      /\S+@\S+\.\S+/.test(value) ? setIsEmailIsValid(false) : setIsEmailIsValid(true);
    }
    else if (name === "phone") {
      setPhone(value);
      value.length === 10 && /^\d{10}$/.test(value) ? setIsPhoneValid(false) : setIsPhoneValid(true);
    }
    else if (name == "password") {
      setPassword(value)
      value.length < 6 ? setIsPasswordValid(true) : setIsPasswordValid(false)
    }
    else if (name === "gender") {
      setGender(value);
      value ? setIsGenderValid(false) : setIsGenderValid(true);
    }
    else if (name === "dob") {
      setDob(value);
      const selectedDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - selectedDate.getFullYear();
      const isUnderAge = age < 18 || (age === 18 && today < new Date(today.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));

      isUnderAge ? setIsDobValid(true) : setIsDobValid(false);
    }
    checkFormValidity()
  }

  const checkFormValidity = () => {
    if (
      fullName &&
      !isNameIsValid &&
      email &&
      !isEmailIsValid &&
      phone &&
      !isPhoneValid &&
      password &&
      !isPasswordValid &&
      gender &&
      !isGenderValid &&
      dob &&
      !isDobValid
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setGender("");
    setDob("");


    setIsNameIsValid(false);
    setIsEmailIsValid(false);
    setIsPhoneValid(false);
    setIsPasswordValid(false);
    setIsGenderValid(false);
    setIsDobValid(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (isFormValid) {
        alert("Registered successfully!"); 
        handleReset()
    } else {
        alert("Please fill in all required fields correctly."); 
    }
};


  return (
    <>
      <div className='container-fluid d-flex justify-content-center align-items-center vh-100 w-100 bg-dark'>
        <div style={{ width: '600px' }} className='bg-light rounded p-5'>
          <h1 className=' text-center fw-bolder'>Register Form</h1>
          <form className='mt-3' >
            <div className='mb-3'>
              <TextField name='fullName' onChange={e => userInputValidation(e.target)} value={fullName || ""} className='w-100' id="fullName" color='dark' label="Full Name" variant="outlined" />
              {
                isNameIsValid && (
                  <div className='text-danger'>*Invalid Full Name (letters and spaces only)</div>
                )
              }
            </div>

            <div className='mb-3'>
              <TextField value={email || ""} onChange={e => userInputValidation(e.target)} name='email' className='w-100' id="outlinedEmail" color='dark' label="Email Address" variant="outlined" />
              {
                isEmailIsValid && (
                  <div className='text-danger'>*Valid Email is Required</div>
                )
              }
            </div>
            <div className='mb-3'>
              <TextField value={phone || ""} onChange={e => userInputValidation(e.target)} name='phone' className='w-100' id="outlinedPhone" color='dark' label="Phone Number" variant="outlined" />
              {
                isPhoneValid && (
                  <div className='text-danger'>*10 digit Number is Required</div>
                )
              }
            </div>
            <div className='mb-3'>
              <TextField value={password || ""} onChange={e => userInputValidation(e.target)} name='password' className='w-100' id="outlinedPassword" color='dark' type='password' label="Password" variant="outlined" />
              {
                isPasswordValid && (
                  <div className='text-danger'>*Password must be at least 6 characters</div>
                )
              }
            </div>
            <div className='mb-3'>
              <FormControl >
                <FormLabel color='dark' className='fw-bolder' id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup value={gender || ""} onChange={e => userInputValidation(e.target)} row aria-labelledby="demo-radio-buttons-group-label" name="gender" >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                {
                  isGenderValid && <div className="text-danger">*Gender is required</div>
                }
              </FormControl>
            </div>
            <div className='mb-3'>
              <TextField value={dob || ""} onChange={e => userInputValidation(e.target)} name='dob' className='w-100' InputLabelProps={{ shrink: true }} type='date' id="outlinedDOB" color='dark' label="Date of Birth" variant="outlined" />
              {
                isDobValid && <div className="text-danger">*You must be at least 18 years old</div>
              }
            </div>
            <div className='mb-3 text-center'>
              <Button onClick={handleSubmit} disabled={!isFormValid} style={{ width: '150px', height: '50px', marginRight: '20px',  backgroundColor: isFormValid ? 'black' : 'grey' }} variant="contained">Submit</Button>
              <Button onClick={handleReset} style={{ width: '150px', height: '50px', backgroundColor: 'black' }} variant="contained">Cancel</Button>
            </div>
          </form>
        </div>

      </div>
    </>
  )
}

export default App
