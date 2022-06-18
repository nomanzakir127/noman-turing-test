
import { FC, useState } from 'react'
import { useFormik } from 'formik';
import './login.css'
import { login } from '../../services/AuthenticationService';
import { useNavigate } from "react-router-dom";

  
  
  const Login: FC = () => {
  
    let [error, setError] = useState('')
    const navigate = useNavigate()
  
    const formik = useFormik({
      initialValues: {
        username:"",
        password:"",
      },
      onSubmit: values => {
        values.username = values.username.trim()
        loginToDashboard(values)
      },
    });
  
    const loginToDashboard = (userInfo: any) => {  
          login("auth/login", userInfo).then((res:any)=>{
             
            if(res.error)
            {
                setError(res.error.message)
                return
            }
            else{
                navigate('/dashboard')
            }
          })
     
    };
  
    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="login-section">
            <div className="split left">
              <div className="centered">
                <h2 className="text-light fw-bold">Turing Technologies</h2>
                <h3 className="text-light fw-bold">Test</h3>
              </div>
            </div>
            <div className="split right">
              <div className="centered w-100">
                <div className="Container">
                  <div className="row">
                    <div className="col-md-8 mx-auto">
                      <h3 className="mb-4 fw-bold">LOGIN</h3>
                      {error && <div className="alert alert-danger">{error}</div>}
                      <label htmlFor="basic-url" className="form-label float-start">Username</label>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-address-card"></i></span>
                        <input type="text" className="form-control" placeholder="Enter User Name" aria-label="Username" aria-describedby="basic-addon1" id="username" name="username" onChange={formik.handleChange} value={formik.values.username}/>
                      </div>
                      <label htmlFor="basic-url" className="form-label float-start">Password</label>
                      <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock"></i></span>
                        <input type="password" className="form-control" placeholder="Enter Password" aria-label="Username" aria-describedby="basic-addon1" id="password" name="password" onChange={formik.handleChange} value={formik.values.password}/>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                          <a href="/"><p className="mb-0 text-secondary"></p></a> 
                          {/* <a href="/"><p className="mb-0 text-secondary">Forgot Password?</p></a> */}
                          {/* <p className="mb-0 text-secondary cursor-pointer" ref={ref} onClick={()=>setOpen(true)}>Forgot Password?</p> */}
                          <button type="submit" className="btn btn-primary">Login</button>
                      </div>
                      {/* <div className="d-flex align-items-center justify-content-between">
                          <a href="/registration"><p className="mb-0 text-secondary">Not a User?</p></a>
                          <button type="button" className="btn btn-outline-primary" onClick={()=>navigate('/registration')}>Register</button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
    );
  }
  
  export default Login;
  