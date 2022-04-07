import React, {useState, useEffect} from 'react'
import './App.css'

function App() {

  const initialValue = {username:'', email:'', password:''};
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
      console.log(e.target);
      const {name, value } = e.target;
      setFormValues({...formValues, [name]: value})
      console.log(formValues)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues))
    setIsSubmit(true)

  }
  useEffect (() => {
    console.log(formErrors)
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
      const errors = {}
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.username){
        errors.username = 'Username is required!';
      }
      if (!values.email){
        errors.email = 'Email is required!';
      }
      else if(!regex.test(values.email)){
        errors.email = 'Please enter a valid email!'
      }
      if (!values.password){
        errors.password = 'Password is required!';
      } else if (values.password.length < 4){
        errors.password= 'Password must be more than 4 characters'
      } else if (values.password.length > 10){
        errors.password= 'Password cannot exceed 10 characters'
      }

      return errors
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className='ui message success'>Signed In Successfully</div>)
        : (<pre>Please Insert correct details</pre>)}
      
      <form onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <div className='ui form'>
          <div className='field'>
            <label>Username</label><br/>
            <input type='text' autoComplete='off' name='username' value={formValues.username} onChange={handleChange} placeholder='Enter your username'/>
          </div>
          <p>{formErrors.username}</p>
          <div className='field'>
            <label>Email</label><br/>
            <input type='email' autoComplete='off' name='email' value={formValues.email} onChange={handleChange} placeholder='Enter a valid email'/>
          </div>
          <p>{formErrors.email}</p>
          <div className='field'>
            <label>Password</label><br/>
            <input type='password' autoComplete='off' name='password' value={formValues.password} onChange={handleChange} placeholder='Enter your password'/>
          </div>
          <p>{formErrors.password}</p><br/>
          <button className='btn'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
