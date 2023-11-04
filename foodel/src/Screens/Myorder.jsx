import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Myorder = () => {

    const [orderdata,setorderdata]=useState({});

    const fecthmyorder=async()=>{
        console.log(localStorage.getItem('useremail'));
        await fetch("http://localhost:5000/api/myorderdata",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('useremail')
            })
        }).then(async(res)=>{
            let resp=await res.json();
            await setorderdata(resp);
        })
    }

    useEffect(()=>{
        fecthmyorder();
    },[])

  return (
    <>
        <div>
        <div>
            <Navbar/>
        </div>

        <div className='container'>
            <div className='row'>
                {
                    orderdata!={}?Array(orderdata).map((data)=>{
                        return (
                            data.orderdata?data.orderdata.orderdata.slice(0).reverse().map((item)=>{
                                return (
                                    item.map((arrdata)=>{
                                        return (
                                            <div>
                                                {
                                                    arrdata.orderdate?<div className='m-auto mt-5'>
                                                        {
                                                            data=arrdata.orderdate
                                                        }
                                                        <hr/>
                                                    </div>:


                                                    <div className='col-12 col-md-6 col-lg-3'>
                                                        <div className='card mt-3' style={{width:"16rem",maxHeight:"360px"}}>
                                                        <img src={arrdata.img} className='card-img-top' alt="" style={{ height:"120px",objectFit:"fill"}}/>
                                                        <div className='card-body'>
                                                            <h5 className='card-title'>{arrdata.name}</h5>
                                                            <div className='container w-100 p-0' style={{height:"38px"}}>
                                                                <span className='m-1'>{arrdata.qty}</span>
                                                                <span className='m-1'>{arrdata.size}</span>
                                                                <span className='m-1'>{data}</span>
                                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{arrdata.price}/-
                                                                </div>
                                                            </div>
                                                        </div>

                                                        </div>
                                                    </div>

                                                }
                                            </div>
                                        )
                                    }
                                )
                            )}
                        )
                        :"")}):""
                }
            </div>
        </div>
        <div><Footer/></div>
        </div>
    </>
  )
}

export default Myorder;