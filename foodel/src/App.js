import "./App.css";
import Home from "./Screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import SignUp from "./Screens/SignUp";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./Screens/Cart";
import Myorder from "./Screens/Myorder";


function App() {
  return (
    <>
      <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/myorder" element={<Myorder />} />
        </Routes>
      </Router>
      </CartProvider>
    </>
  );
}

export default App;
