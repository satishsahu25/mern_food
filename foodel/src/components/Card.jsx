import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

const Card = (props) => {
  const options = props.options;

  const fooditem = props.fooditems;
  const data = useCart();
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState(0);
  let sizename = "";
  const dispatch = useDispatchCart();


  const priceref = useRef();
  //size name medium full half
  for (let va in options) {
    if (options[va].price === Number(size)) {
      sizename = options[va].types;
      break;
    }
  }

  const finalprice = qty * Number(size);

  const handleaddtocart = async () => {
   
    let food=null;
    //checking item is already added or not
      for(const item of data){
      if(item.id===fooditem._id){
        food=item;
        break;
      }
    }

    if(food!=null){
      if(food.size===sizename){
        await dispatch({type:"UPDATE",id:fooditem._id,price:finalprice,qty:qty});
        return;
      }else{
        await dispatch({
          type: "ADD",
          id: fooditem._id,
          name: fooditem.name,
          price: finalprice,
          qty: qty,
          size: sizename,
          img: fooditem.img,
        });
        
        
      }
      return;
    
    }
    
    await dispatch({
      type: "ADD",
      id: fooditem._id,
      name: fooditem.name,
      price: finalprice,
      qty: qty,
      size: sizename,
      img: fooditem.img,
    });
    


   
  };

  useEffect(() => {
    setsize(priceref.current.value);
  }, []);

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={fooditem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "200px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{fooditem.name}</h5>
          <p className="card-text">{fooditem.description}</p>
          <div className="container w-100 ">
            <select
              className=" h-100 m-2 bg-success rounded"
              onChange={(e) => setqty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className=" h-100 m-2 bg-success rounded"
              ref={priceref}
              onChange={(e) => {
                setsize(e.target.value);
              }}
            >
              {options.map((data, i) => {
                return (
                  <option key={i} value={data.price}>
                    {data.types}
                  </option>
                );
              })}
              {/* <option value={"Half"}>Half</option>
                    <option value={"Full"}>Full</option> */}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalprice}</div>
          </div>
          <hr />
          <button
            className="btn justify-center btn-success ms-2"
            aria-current="page"
            onClick={handleaddtocart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
