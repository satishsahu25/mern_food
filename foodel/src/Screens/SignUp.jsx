import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'

const SignUp = () => {

  const navigate=useNavigate();
  const [cred, setcred] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handlesubmit = async (e) => {
    // Synthetic event
    e.preventDefault();

    const resp = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: cred.name,
        email: cred.email,
        password: cred.password,
        location: cred.geolocation,
      }),
    });
    const jsondata = await resp.json();
    console.log(jsondata);
    if (!jsondata.success) {
      alert("Invalid credentials");
    }else{
      navigate('/login');
    }
  };

  const onChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={onChange}
              value={cred.name}
            />
          </div>
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

          <div className="mb-3">
            <label htmlFor="geolocation" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              onChange={onChange}
              value={cred.geolocation}
            />
          </div>
          <button type="submit" className="btn btn-success m-3">
            Submit
          </button>
          <Link to="/login" className="btn btn-danger">
            Already a user?
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
