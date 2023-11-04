import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import Modal from "./Modal";
import Cart from "../Screens/Cart";
import { useCart } from "./ContextReducer";


const Navbar = () => {
  const navigate = useNavigate();
  const datasize=useCart().length;

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  const [cartview,setcartview]=useState(false);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Foodel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            <div className="d-flex ">
              {localStorage.getItem("token") ? (
                <div>
                  <div
                    className="btn bg-white text-success mx-1"
                    aria-current="page"
                    onClick={()=>setcartview(true)}
                  >
                    My Cart {" "}
                    {datasize?<Badge pill bg="danger" className="">{datasize}</Badge>:null}
                  </div>
                  {
                    cartview?<Modal onClose={()=>setcartview(false)}><Cart/></Modal>:null
                  }
                  <Link
                    className="btn bg-white text-danger mx-1"
                    aria-current="page"
                    to="/login"
                    onClick={handlelogout}
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    className="btn bg-white text-success mx-1"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </Link>

                  <Link
                    className="btn bg-white text-success mx-1"
                    aria-current="page"
                    to="/signup"
                  >
                    SignUp
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
