import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="py-3 my-4 flex text-center">
        <Link to="/" className="m-2 text-white">Home</Link>
        <Link to="/" className="m-2 text-white">Features</Link>
        <Link to="/" className="m-2 text-white">Pricing</Link>
        <Link to="/" className="m-2 text-white">FAQs</Link>
        <Link to="/" className="m-2 text-white">About</Link>
        <p className="text-center text-muted">© Foodel 2021,Inc</p>
      </footer>
    </div>
  );
};

export default Footer;
