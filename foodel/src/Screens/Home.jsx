import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Carusoel from "../components/Carusoel";

function Home() {

  const [foodcategories,setfoodcategories]=useState([]);
  const [foodItems,setfoodItems]=useState([]);
  const [search,setsearch]=useState("");

  const loadata=async ()=>{
    try{
      let response=await fetch("http://localhost:5000/api/fooddata",{
      method:"GET",
      headers:{
        'Content-Type': 'application/json'
      }
    });
    response=await response.json();

    setfoodcategories(response.foodcategories);
    setfoodItems(response.foodItems);
    }catch(err){
      console.log(err);
    }

  }


  useEffect(()=>{
    loadata();
  },[]);


  return (
    <>
      <div>
        <Navbar />
      </div>
      {/* carosuel */}
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{objectFit:"contain !important"}}>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{zIndex:"10"}}>


            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=>{setsearch(e.target.value)}}
              />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">
                Search
              </button> */}
            </div>


          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900×700/?fruit"
              className="d-block w-100"
              alt="..."
              style={{filter:"brightness(30%)"}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?burger"
              className="d-block w-100"
              alt="..."
              style={{filter:"brightness(30%)"}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?cherry"
              className="d-block w-100"
              alt="..."
              style={{filter:"brightness(30%)"}}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      {/* <div key={data.foodcategories}>{data.foodcategories}</div> */}
      <div className="container">
        {
          (foodcategories!=[])?foodcategories.map((data,i)=>{
            return(
            <div className="row mb-3">
            <div key={i} className="m-3 fs-3">{data.categoryname}</div>
              <hr/>
              {foodItems!=[]?foodItems.filter((item)=>
              (item.categoryname==data.categoryname)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase()))

              ).map((filtereditem,key)=>{
                return(
                  <div className="col-12 col-md-6 col-lg-3">
                  {/* <div key={key}>{filtereditem.name}</div> */}
                  <Card fooditems={filtereditem} options={filtereditem.options} />
                  </div>
                )
              }):<div>fdsfsdf</div>}
            </div>
            )
          }):<div>fdsfsd</div>
        }
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
