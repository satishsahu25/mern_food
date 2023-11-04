import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import trash from '../../src/trash.svg'

const Cart = () => {

    let data=useCart();
    let dispatch=useDispatchCart();
    if(data.length===0){
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
    let totalprice=data.reduce((total,food)=>total+food.price,0);

        const handlecheckout=async()=>{
            let useremail=localStorage.getItem('useremail');
            let response=await fetch("http://localhost:5000/api/orderdata", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                 email:useremail,
                 orderdata:data,
                 orderdate:new Date().toDateString()
                }),
              });
            
              console.log("order response",response);

              if(response.status===200){
                dispatch({type:"DROP"});
              }
        }



  return (
    <div>
    <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
<table className='table table-hover'>
    <thead className='text-success fs-4'>
    <tr>
        <th scope='col'>#</th>
        <th scope='col'>Name</th>
        <th scope='col'>Quantity</th>
        <th scope='col'>Option</th>
        <th scope='col'>Amount</th>
        <th scope='col'>Action</th>
    </tr>
    </thead>
    <tbody>
    {
        data.map((food,index)=>(
            <tr key={index}>
                <th scope='row'>{index+1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                
                <td>
                    <button type='button' className='btn p-0'><img src={trash} style={{height:"25px"}} 
                    alt="delete" onClick={()=>{dispatch({type:"REMOVE",index:index})}}/></button>
                </td>
            </tr>
        )
        
          
        )
    }

    </tbody>
</table>
<div><h1 className='fs-5'> Total Price&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{totalprice}/-</h1></div>
<div className='pb-10'><button className='btn bg-success mt-5' onClick={handlecheckout}>Check Out</button></div>
    </div>
    </div>
  )
}

export default Cart