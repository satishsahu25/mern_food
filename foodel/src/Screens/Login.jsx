import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

const Login = () => {
  const [cred, setcred] = useState({
    email: "",
    password: "",
  });


  const navigate=useNavigate();

  const handlesubmit = async (e) => {
    // Synthetic event
    e.preventDefault();

    const resp = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: cred.email,
        password: cred.password,
      }),
    });
    const jsondata = await resp.json();
    console.log(jsondata);
    if (!jsondata.success) {
      alert("Invalid credentials");
    }
    else {
      console.log(jsondata);
      localStorage.setItem("token",jsondata.token);
   
      localStorage.setItem("useremail",jsondata.userfind.email);
     
      navigate("/");}
    

  };

  const onChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={onChange}
              value={cred.email}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={cred.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success m-3">
            Submit
          </button>
          <Link to="/signup" className="btn btn-danger">
            Create user
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
